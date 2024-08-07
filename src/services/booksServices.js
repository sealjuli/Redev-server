const FileHelper = require("../helpers/fileHelper");

class BooksServices {
  async getBooks() {
    const data = await FileHelper.readFile("data.json");
    return data["books"];
  }

  async getBookById(id) {
    const data = await FileHelper.readFile("data.json");
    const books = data["books"];
    return books.find((val) => val.id === id);
  }

  async getBookByAuthor(author) {
    const data = await FileHelper.readFile("data.json");
    const books = data["books"];
    return books.filter((val) => val.author === author);
  }

  async createBook(book) {
    const data = await FileHelper.readFile("data.json");
    const books = data["books"];
    // добавить нового юзера
    books.push(book);
    // перезаписать файл
    return await FileHelper.writeFile("data.json", {
      users: data["users"],
      books: books,
    });
  }

  async findBookIndexById(id) {
    const data = await FileHelper.readFile("data.json");
    const books = data["books"];
    return books.findIndex((val) => val.id === id);
  }

  async updateBookByIndex(index, req) {
    const data = await FileHelper.readFile("data.json");
    const books = data["books"];
    books[index] = { id: req.params.id, ...req.body };
    // перезаписать файл
    return await FileHelper.writeFile("data.json", {
      users: data["users"],
      books: books,
    });
  }

  async deleteBookByIndex(index) {
    const data = await FileHelper.readFile("data.json");
    const books = data["books"];
    books.splice(index, 1);
    // перезаписать файл
    return await FileHelper.writeFile("data.json", {
      users: data["users"],
      books: books,
    });
  }
}

module.exports = new BooksServices();
