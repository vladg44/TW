import CryptoJS from "crypto-js";

const word1 = "Goga";
const secretKey = "VLADUT";

const encrypted = CryptoJS.AES.encrypt(JSON.stringify(word1), secretKey).toString();
console.log("Encrypted word1:", encrypted);

const bytes = CryptoJS.AES.decrypt(encrypted, secretKey);
const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); // ✅ fix

console.log("Decrypted word1:", decrypted);

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// reconstruim __dirname, pentru că nu există automat în ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folderFile = (folderName, fileName) => {
  const folderPath = path.join(__dirname, folderName);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  const filePath = path.join(folderPath, fileName);
  fs.writeFileSync(filePath, 'This is a new file.');
  console.log(`Folder "${folderName}" with file "${fileName}" created.`);
};

folderFile('NewFolder', 'newFile.txt');
folderFile('NewFolde1r', 'anotherFile.txt');

//delete the fodler and file created
// folderFile('NewFolder', 'anotherFile.txt'); above
const deleteFolderFile = (folderName, fileName) => {
  const folderPath = path.join(__dirname, folderName);
  const filePath = path.join(folderPath, fileName);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`File "${fileName}" deleted.`);
    }
    if (fs.existsSync(folderPath)) {
        fs.rmdirSync(folderPath);
        console.log(`Folder "${folderName}" deleted.`);
    }

}

deleteFolderFile('NewFolder', 'newFile.txt');
deleteFolderFile('NewFolde1r', 'anotherFile.txt');



