const sampleDictionary = [
  "the",
  "quick",
  "brown",
  "fox",
  "jumps",
  "over",
  "lazy",
  "dog",
];

const sampleText = `
    best
    read
    on
    windy
    nights
`;
const checkAcrostic = (text, dictionary) => {
  const candidate = text
    .split("\n")
    .filter((e) => e)
    .map((e) => e.trim())
    .map((e) => e[0])
    .join("");

  return dictionary.indexOf(candidate) !== -1;
};

console.log(checkAcrostic(sampleText, sampleDictionary));

text1 = "Javascript este minunat";
dic1 = ["este"];

const censorWord = (text, dict) => {
  let result = [];
  const censor = text
    .split(" ")
    .filter((e) => e)
    .map((e) => e.trim());
  for (let word of censor) {
    if (dict.indexOf(word) !== -1)
      word = word[0] + "*".repeat(word.length - 2) + word[word.length - 1];
    result += word + " ";
  }
  return result.trim();
};

console.log(censorWord(text1, dic1));

const getFilteredObjects = (array, object) => {
  return array.filter((element) => {
    let result = true;
    Object.keys(object).forEach((key) => {
      if (!element[key] || element[key] !== object[key]) {
        result = false;
      }
    });
    return result;
  });
};

const laptops = [
  {
    brand: "HP",
    processor: "i5",
    ram: 8,
  },
  {
    brand: "Lenovo",
    processor: "i5",
    ram: 16,
  },
  {
    brand: "Acer",
    processor: "i5",
    ram: 8,
  },
  {
    brand: "Asus",
    processor: "i7",
    ram: 8,
  },
];

const result = getFilteredObjects(laptops, { processor: "i5", ram: 8 });
console.log("result ", result);
