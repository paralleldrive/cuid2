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
      should: "return a cuid",
      actual: [id.length, typeof id],
      expected: [defaultLength, "string"],
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
