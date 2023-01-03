import EventEmmiter from 'events';

const myEmmiter = new EventEmmiter();
const [,,x, y,cb] = process.argv;
const operations = ['add', 'substract', 'multiply', 'divide'];
const first = +x;
const second = +y;

myEmmiter.on('add', () => {
  console.log(first+second);
})
myEmmiter.on('substract', () => {
  console.log(first-second);
})
myEmmiter.on('multiply', () => {
  console.log(first*second);
})
myEmmiter.on('divide', () => {
  console.log(first/second);
})
myEmmiter.on('typeMismatch', () => {
  console.log('I can operate only with numbers');
})
myEmmiter.on('wrongOperation', () => {
  console.log('Please specify proper key word.');
})

try {
  if (isNaN(first) || isNaN(second)) {
    throw new Error('typeMismatch')
  };
  if (!operations.includes(cb)) {
    throw new Error('wrongOperation')
  }
  myEmmiter.emit(cb);
} catch (error) {
  myEmmiter.emit(error.message)
}

