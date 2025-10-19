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
const div = 3;
const getSum = (numere, div) =>
  numere
    .filter((nr) => nr % div == 0)
    .reduce((prev, current) => prev + current, 0);
console.log("Suma: ", getSum(numere, div));
