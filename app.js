// черновик, не нужно проверять //

import EventEmmiter from "events";

const myEmmiter = new EventEmmiter();

const logDbConnection = () => {
  console.log("DB connected");
};

myEmmiter.addListener("connected", logDbConnection);
myEmmiter.emit("connected");

myEmmiter.removeListener("connected", logDbConnection);

myEmmiter.emit("connected");

myEmmiter.on("msg", (data) => {
  console.log(`I received ${data}`);
});

myEmmiter.emit("msg", "Close the lid please");

myEmmiter.once("off", () => {
  console.log("I reacted only once");
});

myEmmiter.emit("off");
myEmmiter.emit("off");

console.log(myEmmiter.getMaxListeners());

























// const reverse = (string) => {
//   const reversedList = [];

//   const reducer = (tally, el) => {
//     tally.push(el.toLowerCase());
//     return tally;
//   };

//   const charsList = Array.from(string).reduceRight(reducer, reversedList).join('');

//   return charsList;
// }

// console.log(reverse('Node'));
