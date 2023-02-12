import path from "path";

import mloader from "./utils/module-loader.js";

const MODULES_PATH = path.resolve("./operations");

const [, , x, y, func] = process.argv;
const first = Number(x);
const second = Number(y);

try {
  const calcFunction = await mloader(MODULES_PATH, func)
  if (isNaN(first) || isNaN(second)) {
    throw new Error('I can calc only numbers')
  }
  console.log(calcFunction(first, second));
} catch (error) {
  console.log(error.message);
}
