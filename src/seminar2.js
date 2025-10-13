//fara ajutor gpt
const concatStr1 = (arr2) => {
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
