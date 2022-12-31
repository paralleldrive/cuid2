/* global global, window, module */
const { sha3_512: sha3 } = require("@noble/hashes/sha3");

const defaultLength = 24;
const bigLength = 32;

const createEntropy = (length = 4) => {
  let entropy = "";
  const primes = [
    109717, 109721, 109741, 109751, 109789, 109793, 109807, 109819, 109829,
    109831,
  ];

  while (entropy.length < length) {
    const randomPrime = primes[parseInt(Math.random() * primes.length)];
    entropy = entropy + parseInt(Math.random() * randomPrime).toString(36);
  }
  return entropy;
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
  return BigInt(
    sha3(text)
      .map((x) => x.toString(16))
      .join("")
  )
    .toString(36)
    .slice(2);
};

const alphabet = Array.from({ length: 26 }, (x, i) =>
  String.fromCharCode(i + 97)
);

const randomLetter = () => alphabet[parseInt(Math.random() * alphabet.length)];

const createFingerprint = () =>
  hash(
    parseInt((Math.random() + 1) * 2063) +
      Object.keys(typeof global !== "undefined" ? global : window).toString(36)
  ).toString(36);

const init = ({
  counter = parseInt(Math.random() * 2057),
  length = defaultLength,
  fingerprint = createFingerprint(),
} = {}) => {
  return function cuid2() {
    const time = Date.now().toString(36);
    const random = createEntropy(length);
    (counter++).toString(36);
    const firstLetter = randomLetter();
    const hashInput = `${time + random + counter + fingerprint}`;

    return `${firstLetter + hash(hashInput, length).substring(1, length)}`;
  };
};

const createId = init();

module.exports.getConstants = () => ({ defaultLength, bigLength });
module.exports.init = init;
module.exports.createId = createId;
