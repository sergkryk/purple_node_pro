import perf_hooks from 'perf_hooks';
import getFactorial from './getFactorial.js';
import getList from './mockList.js'

const performanceObserver = new perf_hooks.PerformanceObserver((items, observer) => {
  console.log(items.getEntries());
});

performanceObserver.observe({entryTypes: ['function']});

function compute(arr) {
  return arr.map(el => getFactorial(el));
}

function main() {
  const arr = [
    compute(getList()),
    compute(getList()),
    compute(getList()),
    compute(getList()),
  ]
  return arr;
}

main = perf_hooks.performance.timerify(main);

main()
