/* eslint-disable no-undef */
const { describe } = require("riteway");
const { createId, init, getConstants } = require("./index");
const { createIdPool, info } = require("./test-utils.js");

describe("Cuid2", async (assert) => {
  {
    const id = createId();
    const defaultLength = getConstants().defaultLength;

    assert({
      given: "nothing",
      should: "return a cuid",
      actual: [id.length, typeof id],
      expected: [defaultLength, "string"],
    });
  }

  {
    // Test that custom cuid lengths work
    const length10 = init({ length: 10 });

    assert({
      given: "custom cuid length",
      should: "return a cuid with the specified length",
      actual: length10().length,
      expected: 10,
    });
  }
});
