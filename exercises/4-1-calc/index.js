async function main() {
  const MODULES_PATH = './operations/'
  const [,,x,y,operation] = process.argv;
  
  async function loadModule(moduleName) {
    try {
      const { default: defaultModuleFun } = await import(`${MODULES_PATH}${moduleName}.js`)
      return defaultModuleFun;
    }
    catch(err) {
      return 'No such operation! Please specify the propper key word. E.g. "add", "substract", "multiply" or "divide"'
    }
  }

  const cb = await loadModule(operation);
  if (typeof(cb) !== 'function') {
    console.log(cb);
  } else {
    console.log(cb(+x, +y));
  }
};

main();
