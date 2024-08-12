const FileHelper = require("../helpers/fileHelper");

class UsersServices {
  async getUsers() {
    const data = await FileHelper.readFile("data.json");
    return data.users; // data["users"];
  }

  async getUserById(id) {
    const data = await FileHelper.readFile("data.json");
    const users = data.users;
    return users.find((val) => val.id === id);
  }

  async getUserByName(name) {
    const data = await FileHelper.readFile("data.json");
    const users = data.users;
    return users.filter((val) => val.username === name);
  }

  async createUser(user) {
    const data = await FileHelper.readFile("data.json");
    const users = data.users;
    // добавить нового юзера
    users.push(user);
    // перезаписать файл
    return await FileHelper.writeFile("data.json", {
      users: users,
      books: data.books,
    });
  }

  async findUserIndexById(id) {
    const data = await FileHelper.readFile("data.json");
    const users = data.users;
    return users.findIndex((val) => val.id === id);
  }

  async updateUserByIndex(index, req) {
    const data = await FileHelper.readFile("data.json");
    const users = data.users;
    users[index] = { id: req.params.id, ...req.body };
    // перезаписать файл
    return await FileHelper.writeFile("data.json", {
      users: users,
      books: data.books,
    });
  }

  async updateUserPasswordByIndex(index, password) {
    const data = await FileHelper.readFile("data.json");
    const users = data.users;
    users[index].password = password;
    // перезаписать файл
    return await FileHelper.writeFile("data.json", {
      users: users,
      books: data.books,
    });
  }

  async deleteUserByIndex(index) {
    const data = await FileHelper.readFile("data.json");
    const users = data.users;
    users.splice(index, 1);
    // перезаписать файл
    return await FileHelper.writeFile("data.json", {
      users: users,
      books: data.books,
    });
  }
}

module.exports = new UsersServices();
