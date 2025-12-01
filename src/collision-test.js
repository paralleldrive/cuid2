import { describe } from "riteway";
import { Worker } from "worker_threads";

import { info } from "./test-utils.js";

// This is the code that will be run in each worker thread.
// It creates an id pool and returns it.
const workerCode = `
  import { parentPort } from 'node:worker_threads';
  import { createIdPool } from './src/test-utils.js';
  const { max } = JSON.parse(process.argv[2]);
  createIdPool({ max }).then((idPool) => parentPort.postMessage(idPool));
`;

// This function creates a worker thread and returns a promise that resolves
// with the id pool returned by the worker.
async function createIdPoolInWorker(max) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerCode, {
      eval: true,
      argv: [JSON.stringify({ max })],
    });
    worker.on("message", resolve);
    worker.on("error", reject);
  });
}

// This function creates an array of promises, each of which creates an id pool
// in a worker thread.
const createIdPoolsInWorkers = (numWorkers, max) => {
  return Promise.all(
    Array.from({ length: numWorkers }, () => createIdPoolInWorker(max))
  );
};

describe("Collision Test", async (assert) => {
  {
    const n = 7 ** 8 * 2;
    info(`Testing ${n} unique IDs...`);
    const numPools = 7;
    const pools = await createIdPoolsInWorkers(numPools, n / numPools);
    const ids = [].concat(...pools.map((x) => x.ids));
    const sampleIds = ids.slice(0, 10);
    const set = new Set(ids);
    const histogram = pools[0].histogram;
    info(`sample ids: ${sampleIds}`);
    info(`histogram: ${histogram}`);
    const expectedBinSize = Math.ceil(n / numPools / histogram.length);
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

    assert({
      given: "lots of ids generated",
      should: "contain only valid characters",
      actual: ids.every((id) => /^[a-z0-9]+$/.test(id)),
      expected: true,
    });
  }
});
