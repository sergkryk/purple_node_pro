import perf_hooks from 'perf_hooks';
import getFactorial from './getFactorial.js';

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
  return arr.map(el => getFactorial(el));
}

function main() {
  const arr = [
    calcFactorialOfArr(list),
    calcFactorialOfArr(list),
    calcFactorialOfArr(list),
    calcFactorialOfArr(list),
  ]
  return arr;
}

main = perf_hooks.performance.timerify(main);

main()
