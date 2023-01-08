export default function getFactorial(n) {
  if (n == 1 || n == 0) {
    return 1;
  }
  return getFactorial(n - 1) * n;
}