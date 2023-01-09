import perf_hooks from "perf_hooks";
import { Worker } from "worker_threads";
import OS from "os";

import getList from './mockList.js';

process.env.UV_THREADPOOL_SIZE = OS.cpus().length;

const performanceObserver = new perf_hooks.PerformanceObserver(
  (items, observer) => {
    console.log(items.getEntries());
  }
);

performanceObserver.observe({ entryTypes: ["function"] });

function compute(arr) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", {
      workerData: {
        arr,
      },
    });
    worker.on("message", (msg) => {
      console.log(worker.threadId);
      resolve(msg);
    });
    worker.on("error", (err) => {
      reject(err);
    });
    worker.on("exit", () => {
      console.log('Finished');
    });
  });
}

async function main() {
  const arr = await Promise.all([
    compute(getList()),
    compute(getList()),
    compute(getList()),
    compute(getList()),
  ]);
  return arr;
}

main = perf_hooks.performance.timerify(main);

main();
