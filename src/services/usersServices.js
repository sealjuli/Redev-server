class UsersServices {
  #users = [];

  getUsers() {
    return this.#users;
  }

  getUserById(id) {
    return this.#users.find((val) => val.id === +id);
  }

  createUser(user) {
    this.#users.push(user);
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
