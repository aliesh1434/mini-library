// server setup
const express = require("express");
const app = express();

let port = 3000;

app.listen(port, () => {
    console.log("Server running on port 3000");
});

app.get("/", (req, res) => {
    res.send("Mini Library Running");
});

let books = [
    {
        id: 1,
        title: "Node Basics",
        author: "Aliesh"
    },
    {
        id: 2,
        title: "Backend Development",
        author: "Aliesh Patel"
    }
];

// routes
app.post("/books", (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ message: "Title and Author required" });
    }

    const newBook = {
        id: books.length + 1,
        title,
        author
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

app.get("/books", (req, res) => {
    res.json(books);
});

app.get("/books/:id", (req, res) => {
    const book = books.find(b => b.id == req.params.id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
});

//put operation
app.put("/books/:id", (req, res) => {
    const book = books.find(b => b.id == req.params.id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;

    res.json(book);
});


//delete operation
app.delete("/books/:id", (req, res) => {
    const index = books.findIndex(b => b.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    books.splice(index, 1);
    res.json({ message: "Book deleted successfully" });
});

//search route
app.get("/search", (req, res) => {
    const author = req.query.author;

    if (!author) {
        return res.status(400).json({ message: "Author query required" });
    }

    const result = books.filter(b =>
        b.author.toLowerCase().includes(author.toLowerCase())
    );
    console.log(req.query);

    res.json(result);
});
