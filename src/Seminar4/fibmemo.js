function fibGen() {
    const cache = [1, 1]
    const fib = (index) => {
        if (index < cache.length) {
            console.log('found ' + index)
            return cache[index]
        } else {
            console.log('calculated ' + index)
            cache[index] = fib(index - 1) + fib(index - 2)
            return cache[index]
        }
    }
    return fib
}

const fib = fibGen()
console.log(fib(1))
console.log(fib(5))
console.log(fib(3))

function exponentialGen() {
    const cache = [1,2]
const exp=(index)=>{
    if(index<cache.length){
        console.log('found '+index)
        return cache[index];
    }else{
        console.log('calculated '+index)
        cache[index]=exp(index-1)*exp(index-1);
        return cache[index];
    }
}
return exp;
}
const exp=exponentialGen();
console.log(exp(1));
console.log(exp(5));
console.log(exp(3));

