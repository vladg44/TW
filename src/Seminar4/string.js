String.prototype.capitalizedWords = function () {
    return this.replace(/\b[a-z]/g, match => match.toUpperCase())
}

console.log("these words will be calipalized".capitalizedWords());

Number.prototype.times = function() {
    for (let i = 0; i < this; i++) {
        console.log(this);
    }
}


5..times();
3..times();