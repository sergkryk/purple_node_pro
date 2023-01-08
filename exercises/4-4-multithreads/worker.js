import { parentPort, workerData } from 'worker_threads';
import getFactorial from "./getFactorial.js";

function calcFactorialOfArr({ arr }) {
  return arr.map(el => getFactorial(el));
}

parentPort.postMessage(calcFactorialOfArr(workerData));