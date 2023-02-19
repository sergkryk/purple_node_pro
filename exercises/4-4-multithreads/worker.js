import { parentPort, workerData } from 'worker_threads';
import getFactorial from "./getFactorial.js";

function compute({ arr }) {
  return arr.map(el => getFactorial(el));
}

parentPort.postMessage(compute(workerData));