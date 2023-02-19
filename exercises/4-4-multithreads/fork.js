import getFactorial from "./getFactorial.js";
import getList from './mockList.js';

function compute(arr) {
  return arr.map(el => getFactorial(el));
}

process.on("message", () => {
  const arr = [
    compute(getList()),
    compute(getList()),
    compute(getList()),
    compute(getList()),
  ]
  process.send('done');

});
