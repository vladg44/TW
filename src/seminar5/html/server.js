import express, { Router } from 'express';
import pkg from 'body-parser';
import cors from 'cors';

const { urlencoded, json } = pkg;

const app = express();
const router = Router();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());
app.use('/api', router);

let array = [
  { id: 1, name: "Ion", age: 25 },
  { id: 2, name: "Maria", age: 30 },
  { id: 3, name: "Vasile", age: 28 },
  { id: 4, name: "Elena", age: 22 }
];
array = array.filter(el => el !== null);
router.route("/getList").get((req, res) => {
  res.json(array);
});

router.route("/postList").post((req, res) => {
  const el = req.body;
  array.push(el);
  res.json(array);
});

router.route("/getItem/:id").get((req, res) => {
    const id = parseInt(req.params.id, 10);
    const item = array.find(el => el.id === id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Element not found" });
    }
});



router.route("/updateItem/:id").put((req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedData = req.body;
  
  // Găsește indexul elementului care trebuie actualizat
  const index = array.findIndex(el => el.id === id);

  if (index !== -1) {
    // Elementul a fost găsit
    // Păstrează ID-ul original și îmbină datele vechi cu cele noi
    array[index] = { ...array[index], ...updatedData, id: id };
    res.json(array[index]); // Returnează elementul actualizat
  } else {
    
    res.status(404).json({ message: "Element not found" });
  }
});

// --- 👇 METODA DELETE (ȘTERGERE) ADĂUGATĂ 👇 ---
router.route("/deleteItem/:id").delete((req, res) => {
  const id = parseInt(req.params.id, 10);
  
  // Găsește indexul elementului care trebuie șters
  const index = array.findIndex(el => el.id === id);

  if (index !== -1) {
    // Elementul a fost găsit
    // Suprascrie array-ul cu o versiune care NU conține elementul cu acel ID
    array = array.filter(el => el.id !== id);
    
    res.status(200).json(array); 
  } else {
   
    res.status(404).json({ message: "Element not found" });
  }
});


const port = 8000;
app.listen(port, () => {
  console.log(`Serverul a pornit la adresa http://localhost:${port}`);
});
