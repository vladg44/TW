function powersOfTwoGen() {
    const cache = [1]; // 2^0 = 1

    const pow2 = (n) => {
        if (n < cache.length) {
            console.log('found ' + n);
            return cache[n];
        } else {
            console.log('calculated ' + n);
            cache[n] = 2 * pow2(n - 1); // 2^n = 2 * 2^(n-1)
            return cache[n];
        }
    }

    return pow2;
}

const pow2 = powersOfTwoGen();

console.log(pow2(0)); // 1
console.log(pow2(1)); // 2
console.log(pow2(5)); // 32
console.log(pow2(3)); // 8 (din cache)
console.log(pow2(6)); // 64