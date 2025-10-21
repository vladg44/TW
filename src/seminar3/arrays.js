const words = [
  "fox",
  "wolf",
  "snake",
  "crocodile",
  "lion",
  "cat",
  "crocodile",
  "horse",
];

const forbiddenWord = "crocodile";
const minLength = 4;

const filterWords = (words, forbiddenWord, minLength) =>
  words.filter((word) => word !== forbiddenWord && word.length >= minLength);

console.log(filterWords(words, forbiddenWord, minLength));

const birthYr = [2005, 1998, 1977, 2010, 2007, 2009];
const crntYr = 2025;

const adultAges = birthYr
  .map((year) => crntYr - year)
  .filter((age) => age >= 18);

console.log(adultAges);

const getTotalArea = (squareDimensions) =>
  squareDimensions
    .map((side) => side * side)
    .reduce((prev, current) => prev + current, 0);

const squareDimensions = [3, 5, 12, 3, 5, 3];

const result = getTotalArea(squareDimensions);
console.log("result: ", result);

//implementați o funcție care primește ca parametrii un array de numere și un număr și returnează suma tuturor numerelor din array divizibile cu cel de-al doilea parametru.
const numere = [5, 7, 11, 27, 15, 23, 21, 35, 42];
const div = numere[1];
const getSum = (numere, div) =>
  numere
    .filter((nr) => nr % div == 0)
    .reduce((prev, current) => prev + current, 0);
console.log("Suma: ", getSum(numere, div));

//exemplul 3

const formatString = (s, ...format) => {
  let modified = s;
  for (let i = 0; i < format.length; i++) {
    if (modified.indexOf("{" + i + "}") !== -1) {
      modified = modified.replace("{" + i + "}", format[i]);
    }
  }
  return modified;
};

console.log(
  formatString("this is a {0} string  and we've {1} it ", "nice", "modified")
);

const addAnS = (s, parametrii) => {
  let modified = s;

  for (let key in parametrii) {
    let lista = parametrii[key];
    if (lista != null) {
      const random = Math.floor(Math.random() * lista.length);
      let val = lista[random];

      if (modified.indexOf("{" + key + "}") !== -1) {
        modified = modified.replace("{" + key + "}", val);
      }
    }
  }

  return modified;
};

console.log(
  addAnS("un {substantiv} este {adjectiv}", {
    substantiv: ["căluț", "ursuleț", "pisoi", "iepuraș"],
    adjectiv: ["drăguț", "simpatic", "blând", "energic"],
  })
);

const sampleArray = [1, 2, 3, 4, 5];

const map = (array, transformation) => {
  const result = [];
  for (const element of array) {
    result.push(transformation(element));
  }
  return result;
};
console.log(map(sampleArray, (x) => x * 2));

const reduce = (sampleArray) => {
  let sum = 0;
  for (let i = 0; i < sampleArray.length; i++) sum += sampleArray[i];

  const result = [sum];
  return result;
};

console.log(reduce(sampleArray));
