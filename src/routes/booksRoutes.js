const express = require("express");
const router = express.Router();

const BooksControllers = require("../controllers/booksControllers");

const { body, param, query, header } = require("express-validator");

// Middleware для валидации данных
const validateBody = [
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

const validateParam = [
  param("id").isLength({ min: 5 }).withMessage("Id книги слишком короткий."),
];

const validateQuery = [
  query("author")
    .isLength({ min: 5 })
    .withMessage("ФИО автора слишком короткое."),
];

const validateHeader = [
  header("hideid")
    .isIn(["yes", "no"])
    .withMessage("Значение hideId должно быть yes или no."),
];

// create
router.post("/", validateBody, BooksControllers.createBook);

// read
router.get("/query", validateQuery, BooksControllers.getBooks);

router.get("/header", validateHeader, BooksControllers.getBooks);

router.get("/", BooksControllers.getBooks);

router.get("/:id", validateParam, BooksControllers.getBookById);

// update
router.put("/:id", validateBody, validateParam, BooksControllers.updateBook);

// delete
router.delete("/:id", validateParam, BooksControllers.deleteBook);

module.exports = router;
