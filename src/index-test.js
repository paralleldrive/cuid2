const { describe } = require("riteway");
const {
  createId,
  init,
  getConstants,
  typedArrayToString,
  uuidToNumbers,
  createEntropy,
  random,
  randomLetter,
} = require("./index");
const { createIdPool, info } = require("./test-utils.js");

describe("Cuid2", async (assert) => {
  {
    const id = createId();
    const defaultLength = getConstants().defaultLength;
    info(id);

    assert({
      given: "nothing",
      should: "return a cuid string",
      actual: typeof id,
      expected: "string",
    });
  }

  {
    const id = createId();
    const defaultLength = getConstants().defaultLength;
    info(id);

    assert({
      given: "nothing",
      should: "return a cuid of the default length",
      actual: id.length,
      expected: defaultLength,
    });
  }

  {
    const length = 10;
    // Test that custom cuid lengths work
    const cuid = init({ length });
    const id = cuid();
    info(id);

    assert({
      given: "custom cuid length",
      should: "return a cuid with the specified length",
      actual: id.length,
      expected: length,
    });
  }

  {
    const length = 32;
    // Test that large cuid lengths work
    const cuid = init({ length });
    const id = cuid();
    info(id);

    assert({
      given: "custom cuid length",
      should: "return a cuid with the specified length",
      actual: id.length,
      expected: length,
    });
  }
});

describe("typedArrayToString", async (assert) => {
  {
    const nums = Array.from({ length: 256 }, (x, i) => i);
    const expected = nums.map((x) => `${x}`).join("");

    const typedArray = new Uint8Array(nums);
    const actual = typedArrayToString(typedArray);
    info(`${actual.slice(0, 32)}...`);

    assert({
      given: "a typed array",
      should: "return the correct corresponding string",
      actual,
      expected,
    });
  }
});

describe("uuidToNumbers", async (assert) => {
  const string = "bcecfdae-af13-4e0c-b31d-1769a4c3e09f";
  const expected = [0.7379911948782372, 0.6838883191076779];
  const actual = uuidToNumbers(string);
  info(`uuid: ${string}`);
  info(`results: ${actual}`);

  assert({
    given: "a string",
    should: "return the correct corresponding number",
    actual,
    expected,
  });
});

describe("createEntropy", async (assert) => {
  const entropy = createEntropy(4);
  info(`entropy: ${entropy}`);

  assert({
    given: "number of characters of entropy to generate",
    should: "return a string of the correct length",
    actual: entropy.length,
    expected: 4,
  });
});

describe("random", async (assert) => {
  const actual = random();
  info(`random: ${actual}`);

  assert({
    given: "nothing",
    should: "return a number",
    actual: typeof actual,
    expected: "number",
  });
});

describe("randomLetter", async (assert) => {
  const actual = randomLetter();
  info(`randomLetter: ${actual}`);

  assert({
    given: "nothing",
    should: "return a random letter",
    actual: actual.length,
    expected: 1,
  });

  assert({
    given: "nothing",
    should: "return a letter in the valid range [a-z]",
    actual: /[a-z]/.test(actual),
    expected: true,
  });
});
