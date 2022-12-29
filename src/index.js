/* global global, window, module */
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

function hash(input = "", length = bigLength) {
  // If the input is too short, add entropy to it
  if (input.length < length)
    input = input + createEntropy(length - input.length);

  // Hash keys start as prime numbers because prime numbers
  // are a good source of non-repeating random entropy.
  // The number of hash keys determine the length of the output.
  // More hash keys = longer output.
  const hashKeys = [109717, 109721, 109741, 109751, 109789, 109793];

  // Salt the input with randomness to prevent collisions.
  // The salt should be at least the same length as the output hash.
  const text = input + createEntropy(length);

  for (let i = 0; i < text.length; i++) {
    const chr = text.charCodeAt(i);
    for (let j = 0; j < hashKeys.length; j++) {
      const hash = hashKeys[j];
      hashKeys[j] = Math.abs(parseInt((hash << 5) - hash + chr));
    }
  }

  let output = "";
  for (let i = 0; i < hashKeys.length; i++) {
    output = output + hashKeys[i].toString(36);
  }

  return output;
}

const alphabet = Array.from({ length: 26 }, (x, i) =>
  String.fromCharCode(i + 97)
);

const randomLetter = () => alphabet[parseInt(Math.random() * alphabet.length)];

const createFingerprint = () =>
  hash(
    parseInt(Math.random() * 2063) +
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

    return `${
      firstLetter +
      hash(time + random + counter + fingerprint, length).substring(1, length)
    }`;
  };
};

const createId = init();

module.exports.getConstants = () => ({ defaultLength, bigLength });
module.exports.init = init;
module.exports.createId = createId;
