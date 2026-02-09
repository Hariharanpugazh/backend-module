const Book = require("../models/Book");

// POST /api/books — protected
const createBook = async (req, res) => {
  try {
    const { title, author, genre, price, inStock } = req.body;

    if (!title || !author || !genre || price === undefined) {
      return res
        .status(400)
        .json({ message: "Please provide title, author, genre and price" });
    }

    const book = await Book.create({ title, author, genre, price, inStock });
    res.status(201).json({ message: "Book created successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/books — public
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ count: books.length, books });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/books/:id — public
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid book ID" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PUT /api/books/:id — protected
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid book ID" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE /api/books/:id — protected
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid book ID" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createBook, getAllBooks, getBookById, updateBook, deleteBook };
