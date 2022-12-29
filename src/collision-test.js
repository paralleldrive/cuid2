const { describe } = require("riteway");
const { createId } = require("./index");
const { createIdPool, info } = require("./test-utils.js");

describe("Collision Test", async (assert) => {
  {
    const n = 1000000;
    const idPool = createIdPool({ max: n });
    const sampleIds = idPool.ids.slice(0, 10);
    info(`sample ids: ${sampleIds}`);
    info(`histogram: ${idPool.histogram}`);

    assert({
      given: "lots of ids generated",
      should: "generate no collissions",
      actual: idPool.ids.length,
      expected: n,
    });
  }
});
