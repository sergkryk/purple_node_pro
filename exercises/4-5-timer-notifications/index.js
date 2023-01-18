import notifier from 'node-notifier';
const [, , arg1 = "0h", arg2 = "0m", arg3 = "0s"] = process.argv;

const MAX_TIMEOUT_INTERVAL = 86400000;


const hoursEx = new RegExp(/\d{1,}[Hh]$/);
const minutesEx = new RegExp(/\d{1,}[Mm]$/);
const secondsEx = new RegExp(/\d{1,}[Ss]$/);

const converter = {
  hours: function (h) {
    return parseInt(h) * 60 * 60 * 1000;
  },
  minutes: function (m) {
    return parseInt(m) * 60 * 1000;
  },
  seconds: function (s) {
    return parseInt(s) * 1000;
  },
};

function msToTime(duration) {
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / 1000 / 60) % 60);
  let hours = Math.floor((duration / 1000 / 60 / 60) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}

const argsList = [arg1, arg2, arg3];

function reducer(acc, value) {
  if (hoursEx.test(value)) {
    acc = acc + converter.hours(value);
    return acc;
  }
  if (minutesEx.test(value)) {
    acc = acc + converter.minutes(value);
    return acc;
  }
  if (secondsEx.test(value)) {
    acc = acc + converter.seconds(value);
    return acc;
  }
  if (
    !hoursEx.test(value) ||
    !minutesEx.test(value) ||
    !secondsEx.test(value)
  ) {
    console.log(
      `The value: ${value} is not recognized. Please use the following time interval format 24h 60m 60s`
    );
  }
  return acc;
}

const timeout = argsList.reduce(reducer, 0);

if (timeout <= 0) {
  console.log("I cannot set timeout. The interval is equal 0");
} else if (timeout >= MAX_TIMEOUT_INTERVAL) {
  console.log("I cannot set timeout. The interval must not be more than 24 hours");
} 
else {
  console.log(`The timer is set for ${msToTime(timeout)}`);
  setTimeout(() => {
    notifier.notify('The time is up!')
  }, timeout);
}