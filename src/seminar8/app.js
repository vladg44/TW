import express, { Router, json, urlencoded } from 'express'
import Book from './book.js'
const app = express()
const port = 3000


const bookRouter = Router()

app.use(json())
app.use(urlencoded({ extended: true }))
app.use('/api', bookRouter)


let books = [new Book(1, "Dune", "sf", "Frank Herbert"),
new Book(2, "Robinson Crusoe", "adventure", "Daniel Defoe"),
new Book(3, "Foundation", "sf", "Asimov"),
new Book(4, "The Hobbit", "fantasy", "J.R.R. Tolkien")]

bookRouter.route('/books')
    .get((req, res) => {
        let result = [...books]; 

        if (req.query.genre) {
            result = result.filter(x => x.genre === req.query.genre);
        }

        if (req.query.al === 'true') {
            
            result.sort((a, b) => a.name.localeCompare(b.name));
        }

        res.json(result);
    })
    .post((req, res) => {
        const newBook = req.body;

        
        if (!newBook.name || !newBook.genre) {
            return res.status(400).json({ 
                message: "Eroare: Câmpurile 'name' și 'genre' sunt obligatorii." 
            });
        }

        if (typeof newBook.name !== 'string' || newBook.name.length < 3) {
            return res.status(400).json({ 
                message: "Eroare: 'name' trebuie să fie un text de minim 3 caractere." 
            });
        }

        
        const bookToSave = {
            id: books.length + 1,
            name: newBook.name,
            genre: newBook.genre,
            author: newBook.author || "Anonim"
            
        };

       
        books.push(bookToSave);
        
        console.log(books);

        
        return res.status(201).json(bookToSave);
    })

    //put dupa id
    bookRouter.route('/books/:id')
    .put((req, res) => {
        const bookId = parseInt(req.params.id);
        const updatedBook = req.body;
        const bookIndex = books.findIndex(b => b.id === bookId);

        if (bookIndex === -1) {
            return res.status(404).json({ message: "Cartea nu a fost găsită." });
        }
        books[bookIndex] = { id: bookId, ...updatedBook };
        return res.json(books[bookIndex]);
    })
    //delete dupa id
    .delete((req, res) => {
        const bookId = parseInt(req.params.id);
        const bookIndex = books.findIndex(b => b.id === bookId);
        if (bookIndex === -1) {
            return res.status(404).json({ message: "Cartea nu a fost găsită." });
        }
        books.splice(bookIndex, 1);
        return res.status(204).send();
    });

app.get('/', (req, res) => {
    res.send('Welcome to my API')
})

app.listen(port, () => {
    console.log('Running on the port ' + port)
})