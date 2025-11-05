import fs from "fs";
import path from "path";
import { rimraf } from "rimraf";

const folderName = "MyFolder";
const fileName = "test.txt";
const folderPath = path.join(process.cwd(), folderName);
const filePath = path.join(folderPath, fileName);

// 1️⃣ Creează folderul
function createFolder(name) {
  const folderPath = path.join(process.cwd(), name);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.log(`Folderul "${name}" a fost creat.`);
  } else {
    console.log(`Folderul "${name}" există deja.`);
  }
  return folderPath;
}

// 2️⃣ Creează fișier în folder
function createFileInFolder(folderPath, fileName, content = "Fișier de test") {
  const filePath = path.join(folderPath, fileName);
  fs.writeFileSync(filePath, content);
  console.log(`Fișierul "${fileName}" a fost creat în "${folderPath}".`);
}

// 3️⃣ Șterge folderul și tot conținutul
async function deleteFolder(folderPath) {
  await rimraf(folderPath);
  console.log(`Folderul "${folderPath}" a fost șters complet.`);
}

// 🔹 Program principal
const folder = createFolder(folderName);
createFileInFolder(folder, fileName, "Acesta este un fișier creat în folder.");
await deleteFolder(folder);
