//fara ajutor gpt
let concatStr1 = (arr2) => {
  let final = "";
  for (let i = 0; i < arr2.length; i++) {
    final += arr2[i];
    final += " ";
  }
  return final;
};

//cu ajutor gpt
let concatStr2 = (arr) => arr.join(" ");

console.log(concatStr1(["Seminarul", "este", "facut"]));
console.log(concatStr2(["Seminarul", "este", "facut"]));

let comparare2 = (str1, str2) => {
  if (str1.length != str2.length) return -1;
  else {
    let count = 0;
    for (let i = 0; i < str1.length; i++) if (str1[i] !== str2[i]) count++;
    return count;
  }
};

function comparare1(str1, str2) {
  if (str1.length != str2.length) return -1;
  else {
    let count = 0;
    for (let i = 0; i < str1.length; i++) if (str1[i] !== str2[i]) count++;
    return count;
  }
}

console.log(comparare1("mama", "tata"));
console.log(comparare2("mam", "tata"));
console.log(comparare2("rigla123", "dinozaur"));

let mkarr = (...num) => num;

console.log(mkarr(1, 2, 3, 4, 6, 7, 8, 9));
console.log(makeArray(1, 2, 99, 4, 6, 7, 8, 9));
//apelul functiei se poate apela inainte de blocul functiei
//doar la functii normale nu si la cele cu arrow

function makeArray() {
  let arr = [];
  for (let i = 0; i < arguments.length; i++) {
    arr.push(arguments[i]);
  }
  return arr;
}

function addToArray(array, ...args) {
  for (var i = 0; i < args.length; i++) {
    array.push(args[i]);
  }

  return array;
}

let array = ["a"];
console.log(addToArray(array, "b", "c").join(", "));

function leagaArr(array1, array2) {
  if (array1.length != array2.length) return -1;
  let final = [];
  for (var i = 0; i < array1.length; i++) {
    final.push(array1[i], array2[i]);
  }
  return final;
}
let array1 = ["mere", "pere", "gutui"];
let array2 = ["Messi", "Ronaldo", "De bruyne"];
console.log(leagaArr(array1, array2));
