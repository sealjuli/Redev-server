const UsersServices = require("../services/usersServices");

class UsersControllers {
  createUser(req, res) {
    const user = { ...req.body };
    UsersServices.createUser(user);
    res.send(`Новый пользователь создан. ${JSON.stringify(user)}`);
  }

  getUsers(req, res) {
    const users = UsersServices.getUsers();
    res.send(JSON.stringify(users));
  }

  getUserById(req, res) {
    const user = UsersServices.getUserById(req.params.id);
    if (user) {
      res.send(JSON.stringify(user));
    } else {
      res.send("Пользователь с указанным id не найден");
    }
  }

  updateUser(req, res) {
    const userIndex = UsersServices.findUserIndexById(req.params.id);
    if (userIndex < 0) {
      res.send("Пользователь с указанным id не найден");
    } else {
      UsersServices.updateUserByIndex(userIndex, req);
      res.send(JSON.stringify(UsersServices.getUserById(req.params.id)));
    }
  }

  updateUserPassword(req, res) {
    const userIndex = UsersServices.findUserIndexById(req.params.id);
    if (userIndex < 0) {
      res.send("Пользователь с указанным id не найден");
    } else {
      UsersServices.updateUserPasswordByIndex(userIndex, req.body.password);
      res.send(JSON.stringify(UsersServices.getUserById(req.params.id)));
    }
  }

  deleteUser(req, res) {
    const userIndex = UsersServices.findUserIndexById(req.params.id);
    if (userIndex < 0) {
      res.send("Пользователь с указанным id не найден");
    } else {
      UsersServices.deleteUserByIndex(userIndex);
      res.send(JSON.stringify(UsersServices.getUsers()));
    }
  }
}

module.exports = new UsersControllers();
