const n = parseInt(process.argv[2]);

let fib = (n) => {
  if (n < 0) return null;
  if (n == 0) return 0;
  if (n == 1) return 1;

  let a = 0,
    b = 1;
  for (let i = 2; i <= n; i++) {
    let temp = a + b;
    a = b;
    b = temp;
  }
  return b;
};
console.log(fib(n));
