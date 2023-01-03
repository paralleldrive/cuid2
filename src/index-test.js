const { describe } = require("riteway");
const { createId, init, getConstants } = require("./index");
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
    const id = createId();
    info(id);

    assert({
      given: "nothing",
      should: "return an id that contains only valid characters",
      actual: id.match(/^[a-z0-9]+$/)[0],
      expected: id,
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
