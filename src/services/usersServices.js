const fs = require("fs");

class UsersServices {
  #users = [];

  getUsers() {
    // return this.#users;
    return new Promise((res, rej) => {
      fs.readFile("data.json", "utf8", (err, data) => {
        if (err) {
          console.error(err);
          rej(err);
        }
        res(JSON.parse(data)["users"]);
      });
    });
  }

  getUserById(id) {
    return this.#users.find((val) => val.id === +id);
  }

  createUser(user) {
    // this.#users.push(user);
    // appendFile

    return new Promise((res, rej) => {
      // чтение файла
      fs.readFile("data.json", "utf8", (err, data) => {
        if (err) {
          console.error(err);
          rej(err);
        }
        const users = JSON.parse(data)["users"];
        const books = JSON.parse(data)["books"];
        console.log(users);
        console.log(books);
        // добавить нового юзера
        users.push(user);
        // перезаписать файл
        fs.writeFile(
          "data.json",
          JSON.stringify({ users: users, books: books }),
          (err) => {
            if (err) {
              console.error(err);
              rej(err);
            }
            console.log("Файл успешно записан.");
            res(users);
          }
        );
      });
    });
  }

  findUserIndexById(id) {
    return this.#users.findIndex((val) => val.id === +id);
  }

  updateUserByIndex(index, req) {
    this.#users[index] = { id: +req.params.id, ...req.body };
  }

  updateUserPasswordByIndex(index, password) {
    this.#users[index].password = password;
  }

  deleteUserByIndex(index) {
    this.#users.splice(index, 1);
  }
}

module.exports = new UsersServices();
