import fs from 'fs';

function runLengthEncode(text) {
    let encoded = '';
    let count = 1;
    for (let i = 1; i <= text.length; i++) {
        if (text[i] === text[i - 1]) {
            count++;
        } else {
            encoded += text[i - 1] + count;
            count = 1;
        }
    }
    return encoded;
}

const original=fs.readFileSync('C:/Programare/Proiecte/proiecte vsc/tw/TW/src/RLE/input.txt', 'utf-8');
const encoded=runLengthEncode(original);
console.log('Original Text:', original);
console.log('Encoded Text:', encoded);