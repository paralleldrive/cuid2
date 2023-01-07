/* global global, window, module */
const { v4 } = require("uuid");
const { sha3_512: sha3 } = require("@noble/hashes/sha3");

const defaultLength = 24;
const bigLength = 32;

const randomUUID = v4;

const typedArrayToString = (arr) => arr.map((x) => `${x}`).join("");

const hexToScaled = (str, max = 0xffffffff) => Number(`0x${str}`) / max;

// It's not a requirement to use a UUID. It's just a convenient
// hack in JavaScript to get CSPRNG values if they're available. We never use
// the second half, so we only convert the first half.
const uuidToNumbers = (str) => {
  const string = str.replace(/-/g, "");
  const a = hexToScaled(string.slice(0, 8));
  const b = hexToScaled(string.slice(8, 16));
  return [a, b];
};

const randomValues = () => uuidToNumbers(randomUUID());
const random = () => randomValues()[0];

const globalObj =
  typeof global !== "undefined"
    ? global
    : typeof window !== undefined
    ? window
    : [];

const primes = [
  4294967291, 4294967279, 4294967231, 4294967197, 4294967189, 4294967161,
  4294967143, 4294967111, 4294967087, 4294967029,
];

const createEntropy = (length = 4) => {
  let entropy = "";

  while (entropy.length < length) {
    const [random1, random2] = randomValues();
    const randomPrime = primes[Math.floor(random1 * primes.length)];
    entropy = entropy + Math.floor(random2 * randomPrime).toString(36);
  }
  return entropy.slice(0, length);
};

/**
 *
 * @param { String } input - The input to hash
 * @param { Number } length - The intended length of the id. Note: The hash length is different.
 * @returns
 */
const hash = (input = "", length = bigLength) => {
  // The salt should be long enough to be globally unique across the full
  // length of the hash. For simplicity, we use the same length as the
  // intended id output, defaulting to the maximum recommended size.
  const salt = createEntropy(length);
  const text = input + salt;

  // Drop the first two characters because they bias the histogram
  // to the left.
  return BigInt(typedArrayToString(sha3(text)))
    .toString(36)
    .slice(2);
};

const alphabet = Array.from({ length: 26 }, (x, i) =>
  String.fromCharCode(i + 97)
);

const randomLetter = () => alphabet[Math.floor(random() * alphabet.length)];

const createFingerprint = () =>
  hash(Math.floor((random() + 1) * 2063) + Object.keys(globalObj).toString());

const init = ({
  counter = Math.floor(random() * 2057),
  length = defaultLength,
  fingerprint = createFingerprint(),
} = {}) => {
  return function cuid2() {
    // If we're lucky, the `.toString(36)` calls may reduce hashing rounds
    // by shortening the input to the hash function a little.
    const time = Date.now().toString(36);
    const random = createEntropy(length);
    const counterString = counter.toString(36);
    const firstLetter = randomLetter();
    const hashInput = `${time + random + counterString + fingerprint}`;

    return `${firstLetter + hash(hashInput, length).substring(1, length)}`;
  };
};

const createId = init();

module.exports.getConstants = () => ({ defaultLength, bigLength });
module.exports.init = init;
module.exports.createId = createId;
module.exports.typedArrayToString = typedArrayToString;
module.exports.uuidToNumbers = uuidToNumbers;
module.exports.createEntropy = createEntropy;
module.exports.random = random;
module.exports.randomLetter = randomLetter;
