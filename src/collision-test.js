const { describe } = require("riteway");
const { Worker } = require("worker_threads");

const { createId } = require("./index.js");
const { createIdPool, info } = require("./test-utils.js");

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// This is the code that will be run in each worker thread.
// It creates an id pool and returns it.
const workerCode = `
  const { parentPort } = require('node:worker_threads');
  const { createIdPool } = require('./src/test-utils.js');
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
    const n = 100000;
    const numPools = 10;
    const pools = await createIdPoolsInWorkers(numPools, n);
    const ids = [].concat(...pools.map((x) => x.ids));
    const sampleIds = ids.slice(0, 10);
    info(`sample ids: ${sampleIds}`);
    info(`histogram: ${pools[0].histogram}`);

    assert({
      given: "lots of ids generated",
      should: "generate no collissions",
      actual: ids.length,
      expected: n * numPools,
    });
  }
});
