const { describe } = require("riteway");
const {
  createId,
  init,
  getConstants,
  createCounter,
  bufToBigInt,
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

describe("bufToBigInt", async (assert) => {
  {
    const actual = bufToBigInt(new Uint8Array(2));
    const expected = BigInt(0);

    assert({
      given: "an empty Uint8Array",
      should: "return 0",
      actual,
      expected,
    });
  }

  {
    const actual = bufToBigInt(new Uint8Array([0xff, 0xff, 0xff, 0xff]));
    const expected = BigInt("4294967295");

    assert({
      given: "a maximum-value Uint32Array",
      should: "return 2^32 - 1",
      actual,
      expected,
    });
  }
});
