const express = require("express");
const router = express.Router();

const BooksControllers = require("../controllers/booksControllers");

// create
router.post("/", BooksControllers.createBook);

// read
router.get("/", BooksControllers.getBooks);

router.get("/:id", BooksControllers.getBookById);

// update
router.put("/:id", BooksControllers.updateBook);

// delete
router.delete("/:id", BooksControllers.deleteBook);

module.exports = router;
