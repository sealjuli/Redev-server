const BooksServices = require("../services/booksServices");

const { v4: uuidv4 } = require("uuid");

const { validationResult } = require("express-validator");

class BooksControllers {
  async createBook(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const uuid = uuidv4();
    const result = await BooksServices.createBook({ id: uuid, ...req.body });
    res.send(
      `Новая книга добавлена. ${JSON.stringify({ id: uuid, ...req.body })}`
    );
  }

  async getBooks(req, res) {
    const books = await BooksServices.getBooks();
    res.send(JSON.stringify(books));
  }

  async getBookById(req, res) {
    const book = await BooksServices.getBookById(req.params.id);
    if (book) {
      res.send(JSON.stringify(book));
    } else {
      res.send("Книга с указанным id не найдена");
    }
  }

  async updateBook(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const bookIndex = await BooksServices.findBookIndexById(req.params.id);
    if (bookIndex < 0) {
      res.send("Книга с указанным id не найдена");
    } else {
      await BooksServices.updateBookByIndex(bookIndex, req);
      res.send(JSON.stringify(await BooksServices.getBookById(req.params.id)));
    }
  }

  async deleteBook(req, res) {
    const bookIndex = await BooksServices.findBookIndexById(req.params.id);
    if (bookIndex < 0) {
      res.send("Книга с указанным id не найдена");
    } else {
      await BooksServices.deleteBookByIndex(bookIndex);
      res.send(JSON.stringify(await BooksServices.getBooks()));
    }
  }
}

module.exports = new BooksControllers();
