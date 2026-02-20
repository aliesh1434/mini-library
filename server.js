const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server running on ${PORT}`);
});

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/test")
.then(() => console.log("MongoDB Connected Successfully"))
.catch(err => console.log("DB Connection Error:", err));


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

const Book = mongoose.model("Book", bookSchema);


// root
app.get("/", (req, res) => {
    res.send("Mini Library Running ");
});


// new book
app.post("/books", async (req, res) => {
    try {
        const { title, author } = req.body;

        const newBook = new Book({ title, author });
        const savedBook = await newBook.save();

        res.status(201).json(savedBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// get all books
app.get("/books", async (req, res) => {
    const books = await Book.find();
    res.json(books);
});


// get by id
app.get("/books/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });

        res.json(book);
    } catch (err) {
        res.status(400).json({ error: "Invalid ID format" });
    }
});


// update
app.put("/books/:id", async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedBook) return res.status(404).json({ message: "Book not found" });

        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// delete
app.delete("/books/:id", async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);

        if (!deletedBook) return res.status(404).json({ message: "Book not found" });

        res.json({ message: "Book deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


