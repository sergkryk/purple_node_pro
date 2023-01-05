import perf_hooks from 'perf_hooks';
import OS from 'os';

const performanceObserver = new perf_hooks.PerformanceObserver((items, observer) => {
  console.log(items.getEntries());
});

performanceObserver.observe({entryTypes: ['function']});

const list = [];

for (let i = 0; i < 300000; i++) {
  const random = Math.floor(Math.random()*100);
  list.push(random);
};

function getNumbersDevidedByTree() {
  return list.filter((item) => {
    return item%3 === 0;
  });
}

getNumbersDevidedByTree = perf_hooks.performance.timerify(getNumbersDevidedByTree);

getNumbersDevidedByTree()
