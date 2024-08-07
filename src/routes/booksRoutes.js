const express = require("express");
const router = express.Router();

const BooksControllers = require("../controllers/booksControllers");

const { body } = require("express-validator");

// Middleware для валидации данных
const validateData = [
  body("title")
    .isLength({ min: 3 })
    .withMessage("Название книги слишком короткое."),
  body("author")
    .isLength({ min: 5 })
    .withMessage("ФИО автора слишком короткое."),
  body("genre")
    .isLength({ min: 3 })
    .withMessage("Жанр произведение слишком короткое."),
];

// create
router.post("/", validateData, BooksControllers.createBook);

// read
router.get("/", BooksControllers.getBooks);

router.get("/:id", BooksControllers.getBookById);

// update
router.put("/:id", validateData, BooksControllers.updateBook);

// delete
router.delete("/:id", BooksControllers.deleteBook);

module.exports = router;
