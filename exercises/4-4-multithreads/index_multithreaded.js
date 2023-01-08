import perf_hooks from 'perf_hooks';
import { Worker } from 'worker_threads';
import getFactorial from './getFactorial.js';
import OS from 'os';

process.env.UV_THREADPOOL_SIZE = OS.cpus().length;

const performanceObserver = new perf_hooks.PerformanceObserver((items, observer) => {
  console.log(items.getEntries());
});

performanceObserver.observe({entryTypes: ['function']});

const list = [];

for (let i = 0; i < 3000000; i++) {
  const random = Math.floor(Math.random()*100);
  list.push(random);
};

function calcFactorialOfArr(arr) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', {
      workerData: {
        arr,
      }
    });

    worker.on('message', (msg) => {
      // console.log(worker.threadId);
      resolve(msg);
    })

    worker.on('error', (err) => {
      reject(err);
    })

    worker.on('exit', () => {
      // console.log('Finished');
    })
  })
}

async function main() {
  const arr = await Promise.all([
    calcFactorialOfArr(list),
    calcFactorialOfArr(list),
    calcFactorialOfArr(list),
    calcFactorialOfArr(list),
  ]);
  return arr;
}

main = perf_hooks.performance.timerify(main);

main()
