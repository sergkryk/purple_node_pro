export default async function loadModule(path, moduleName) {
  try {
    const { default: defaultModuleFun } = await import(
      `${path}/${moduleName}.js`
    );
    return defaultModuleFun;
  } catch (err) {
      throw new Error('Wrong operation name! Try add, substract, multiply, divide')
  }
}
