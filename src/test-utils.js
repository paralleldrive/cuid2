import { createId } from "./index.js";

export const info = (txt) => console.log(`# - ${txt}`);

export const idToBigInt = (id, _, __, radix = 36) =>
  [...id.toString()].reduce(
    (r, v) => r * BigInt(radix) + BigInt(parseInt(v, radix)),
    0n
  );

export const buildHistogram = (numbers, bucketCount = 20) => {
  const buckets = Array(bucketCount).fill(0);
  let counter = 1;
  const bucketLength = Math.ceil(
    Number(BigInt(36 ** 23) / BigInt(bucketCount))
  );

  for (const number of numbers) {
    if (counter % bucketLength === 0) console.log(number);

    const bucket = Math.floor(Number(number / BigInt(bucketLength)));
    if (counter % bucketLength === 0) console.log(bucket);

    buckets[bucket] += 1;
    counter++;
  }
  return buckets;
};

export const createIdPool = async ({ max = 100000 } = {}) => {
  const set = new Set();

  for (let i = 0; i < max; i++) {
    set.add(createId());
    if (i % 10000 === 0) console.log(`${Math.floor((i / max) * 100)}%`);
    if (set.size < i) {
      info(`Collision at: ${i}`);
      break;
    }
  }
  info("No collisions detected");

  const ids = [...set];
  const numbers = ids.map((x) => idToBigInt(x.substring(1)));
  const histogram = buildHistogram(numbers);
  return { ids, numbers, histogram };
};
