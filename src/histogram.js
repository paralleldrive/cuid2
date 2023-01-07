const { describe } = require("riteway");
const { createId } = require("./index.js");
const { createIdPool, info } = require("./test-utils.js");

describe("Histogram", async (assert) => {
  {
    const n = 100000;
    info(`Testing ${n} unique IDs...`);
    const pool = await createIdPool({ max: n });
    const ids = pool.ids;
    const sampleIds = ids.slice(0, 10);
    const set = new Set(ids);
    const histogram = pool.histogram;
    info(`sample ids: ${sampleIds}`);
    info(`histogram: ${histogram}`);

    const expectedBinSize = Math.ceil(n / histogram.length);
    const tolerance = 0.05;
    const minBinSize = Math.round(expectedBinSize * (1 - tolerance));
    const maxBinSize = Math.round(expectedBinSize * (1 + tolerance));
    info(`expectedBinSize: ${expectedBinSize}`);
    info(`minBinSize: ${minBinSize}`);
    info(`maxBinSize: ${maxBinSize}`);

    assert({
      given: "lots of ids generated",
      should: "generate no collissions",
      actual: set.size,
      expected: n,
    });

    assert({
      given: "lots of ids generated",
      should: "produce a histogram within distribution tolerance",
      actual: histogram.every((x) => x > minBinSize && x < maxBinSize),
      expected: true,
    });
  }
});
