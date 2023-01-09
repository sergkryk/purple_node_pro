import perf_hooks from "perf_hooks";
import { fork } from "child_process";

const performanceObserver = new perf_hooks.PerformanceObserver(
  (items, observer) => {
    console.log(items.getEntries());
  }
);

performanceObserver.observe({ entryTypes: ["function"] });

async function main() {
  const computing = new Promise((resolve, reject) => {
    console.log('Starting fork process');
    const forkProcess = fork("./fork.js");
    forkProcess.send('compute');
    forkProcess.on("message", (msg) => {
      if (msg == "done") {
        resolve(msg)
        console.log('Fork process is finished');
        forkProcess.disconnect();
      }
    });
  })
  console.log('Waiting fork process to finish...');
  console.log('Doing some other sync stuff...');
  return computing;
}

main = perf_hooks.performance.timerify(main);

main();
