const { describe } = require("riteway");
const {
  createId,
  init,
  getConstants,
  typedArrayToString,
  createCounter,
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

describe("createCounter", async (assert) => {
  const counter = createCounter(10);
  const expected = [10, 11, 12, 13];
  const actual = [counter(), counter(), counter(), counter()];
  info(actual);

  assert({
    given: "a starting number",
    should: "return a function that increments the number",
    actual,
    expected,
  });
});
