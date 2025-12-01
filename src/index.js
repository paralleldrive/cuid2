/* global global, window */
import { sha3_512 as sha3 } from "@noble/hashes/sha3.js";
import BigNumber from "bignumber.js";

const defaultLength = 24;
const bigLength = 32;

/**
 * A cryptographically secure random number generator that mimics Math.random()
 * Uses the Web Crypto API which is available in both modern browsers and Node.js
 * Returns a random float in the range [0, 1) just like Math.random()
 */
const createRandom = () => {
  // Use globalThis.crypto which works in both Node.js and browsers
  if (
    typeof globalThis !== "undefined" &&
    globalThis.crypto &&
    typeof globalThis.crypto.getRandomValues === "function"
  ) {
    return () => {
      // Generate a random 32-bit unsigned integer
      const buffer = new Uint32Array(1);
      globalThis.crypto.getRandomValues(buffer);
      // Convert to a float in [0, 1) by dividing by 2^32
      return buffer[0] / 0x100000000;
    };
  }
  // Fallback to Math.random if crypto is not available
  return Math.random;
};

const random = createRandom();

const createEntropy = (length = 4, rand = random) => {
  let entropy = "";

  while (entropy.length < length) {
    entropy = entropy + Math.floor(rand() * 36).toString(36);
  }
  return entropy;
};

/*
 * Adapted from https://github.com/juanelas/bigint-conversion
 * MIT License Copyright (c) 2018 Juan Hernández Serrano
 */
function bufToBigInt(buf) {
  let value = new BigNumber(0);

  for (const i of buf.values()) {
    // Multiply by 256 (left shift by 8 bits) and add the current byte
    value = value.multipliedBy(256).plus(i);
  }
  return value;
}

const hash = (input = "") => {
  // Drop the first character because it will bias the histogram
  // to the left.
  const encoder = new TextEncoder();
  return bufToBigInt(sha3(encoder.encode(input)))
    .toString(36)
    .slice(1);
};

const alphabet = Array.from({ length: 26 }, (x, i) =>
  String.fromCharCode(i + 97)
);

const randomLetter = (rand) => alphabet[Math.floor(rand() * alphabet.length)];

/*
This is a fingerprint of the host environment. It is used to help
prevent collisions when generating ids in a distributed system.
If no global object is available, you can pass in your own, or fall back
on a random string.
*/
const createFingerprint = ({
  globalObj = typeof global !== "undefined"
    ? global
    : typeof window !== "undefined"
    ? window
    : {},
  random: rand = random,
} = {}) => {
  const globals = Object.keys(globalObj).toString();
  const sourceString = globals.length
    ? globals + createEntropy(bigLength, rand)
    : createEntropy(bigLength, rand);

  return hash(sourceString).substring(0, bigLength);
};

const createCounter = (count) => () => {
  return count++;
};

// ~22k hosts before 50% chance of initial counter collision
// with a remaining counter range of 9.0e+15 in JavaScript.
const initialCountMax = 476782367;

const init = ({
  // Fallback if the user does not pass in a CSPRNG. This should be OK
  // because we don't rely solely on the random number generator for entropy.
  // We also use the host fingerprint, current time, and a session counter.
  random: rand = random,
  counter = createCounter(Math.floor(rand() * initialCountMax)),
  length = defaultLength,
  fingerprint = createFingerprint({ random: rand }),
} = {}) => {
  if (length > bigLength) {
    throw new Error(
      `Length must be between 2 and ${bigLength}. Received: ${length}`
    );
  }
  return function cuid2() {
    const firstLetter = randomLetter(rand);

    // If we're lucky, the `.toString(36)` calls may reduce hashing rounds
    // by shortening the input to the hash function a little.
    const time = Date.now().toString(36);
    const count = counter().toString(36);

    // The salt should be long enough to be globally unique across the full
    // length of the hash. For simplicity, we use the same length as the
    // intended id output.
    const salt = createEntropy(length, rand);
    const hashInput = `${time + salt + count + fingerprint}`;

    return `${firstLetter + hash(hashInput).substring(1, length)}`;
  };
};

const createId = init();

const isCuid = (id, { minLength = 2, maxLength = bigLength } = {}) => {
  const length = id.length;
  const regex = /^[a-z][0-9a-z]+$/;

  try {
    if (
      typeof id === "string" &&
      length >= minLength &&
      length <= maxLength &&
      regex.test(id)
    )
      return true;
  } finally {
  }

  return false;
};

export const getConstants = () => ({ defaultLength, bigLength });
export { init };
export { createId };
export { bufToBigInt };
export { createCounter };
export { createFingerprint };
export { isCuid };
