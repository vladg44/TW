const sampleString = "the quick brown fox jumps over the lazy dog";
const sampleString2 = "aaaaaaaaaa8 bbbbbbb3 ccccc83";

const getfreq = (text) => {
  const words = text.split(" ");
  const result = {};
  let sum = 0;
  for (let word of words) {
    sum += word.length;
    for (let i = 0; i < word.length; i++)
      if (result[word[i]] != null) result[word[i]]++;
      else result[word[i]] = 1;
  }
  for (let char in result) result[char] /= sum;

  return result;
};
console.log(getfreq(sampleString2));
