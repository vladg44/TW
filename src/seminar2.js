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
