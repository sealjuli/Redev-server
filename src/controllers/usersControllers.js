const UsersServices = require("../services/usersServices");

const { v4: uuidv4 } = require("uuid");

class UsersControllers {
  async createUser(req, res) {
    const uuid = uuidv4();
    const result = await UsersServices.createUser({ id: uuid, ...req.body });
    res.send(
      `Новый пользователь создан. ${JSON.stringify({ id: uuid, ...req.body })}`
    );
  }

  async getUsers(req, res) {
    const users = await UsersServices.getUsers();
    res.send(JSON.stringify(users));
  }

  async getUserById(req, res) {
    const user = await UsersServices.getUserById(req.params.id);
    if (user) {
      res.send(JSON.stringify(user));
    } else {
      res.send("Пользователь с указанным id не найден");
    }
  }

  async updateUser(req, res) {
    const userIndex = await UsersServices.findUserIndexById(req.params.id);
    if (userIndex < 0) {
      res.send("Пользователь с указанным id не найден");
    } else {
      await UsersServices.updateUserByIndex(userIndex, req);
      res.send(JSON.stringify(await UsersServices.getUserById(req.params.id)));
    }
  }

  async updateUserPassword(req, res) {
    const userIndex = await UsersServices.findUserIndexById(req.params.id);
    if (userIndex < 0) {
      res.send("Пользователь с указанным id не найден");
    } else {
      await UsersServices.updateUserPasswordByIndex(
        userIndex,
        req.body.password
      );
      res.send(JSON.stringify(await UsersServices.getUserById(req.params.id)));
    }
  }

  async deleteUser(req, res) {
    const userIndex = await UsersServices.findUserIndexById(req.params.id);
    if (userIndex < 0) {
      res.send("Пользователь с указанным id не найден");
    } else {
      await UsersServices.deleteUserByIndex(userIndex);
      res.send(JSON.stringify(await UsersServices.getUsers()));
    }
  }
}

module.exports = new UsersControllers();
