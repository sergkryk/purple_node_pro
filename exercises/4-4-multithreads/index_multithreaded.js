/*/ 
к моему сожалению я не смог добиться прироста производительности ни когда повторял за видео ни у себя в этом задании,
всё время работает в 4ре потока, хотя в этом задании я в принципе не уверен что решил правильно т.к. у меня проходит цикл по очереди
как запустить итерацию одновременно не могу сообразить.
/*/

process.env.UV_THREADPOOL_SIZE = OS.cpus().length;

import perf_hooks from "perf_hooks";
import OS from "os";

const performanceObserver = new perf_hooks.PerformanceObserver(
  (items, observer) => {
    console.log(items.getEntries());
  }
);

performanceObserver.observe({ entryTypes: ["function"] });

const list = [];

for (let i = 0; i < 300000; i++) {
  const random = Math.floor(Math.random() * 100);
  list.push(random);
}

function cutListIntoParts() {
  const mutuableArr = Array.from(list);
  const container = [];
  let step = mutuableArr.length / OS.cpus().length;
  for (let i = 0; i < OS.cpus().length; i++) {
    const tempArr = mutuableArr.splice(0, step);
    container.push(tempArr);
  }
  return container;
}

function multithreadedIteration(arr) {
  const container = [];
  arr.forEach((item) => {
    const temp = item.filter((el) => el % 3 === 0);
    container.push(temp);
  });
  return container;
}

multithreadedIteration = perf_hooks.performance.timerify(
  multithreadedIteration
);

multithreadedIteration(cutListIntoParts())
