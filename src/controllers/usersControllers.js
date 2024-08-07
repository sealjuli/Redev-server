const UsersServices = require("../services/usersServices");

const { v4: uuidv4 } = require("uuid");

const { validationResult } = require("express-validator");
const { query } = require("express");

class UsersControllers {
  async createUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const uuid = uuidv4();
    const result = await UsersServices.createUser({ id: uuid, ...req.body });
    res.send(
      `Новый пользователь создан. ${JSON.stringify({ id: uuid, ...req.body })}`
    );
  }

  async getUsers(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (req.query.username) {
      let users = await UsersServices.getUserByName(req.query.username);
      if (users) {
        if (req.headers.hidepassword === 'yes') {
          users = users.map((val) => {
            return { id: val.id, username: val.username, email: val.email };
          });
        }
        res.send(JSON.stringify(users));
      } else {
        res.send("Пользователи с таким username отсутсвуют");
      }
    } else {
      let users = await UsersServices.getUsers();
      if (req.headers.hidepassword === 'yes') {
        users = users.map((val) => {
          return { id: val.id, username: val.username, email: val.email };
        });
      }
      res.send(JSON.stringify(users));
    }
  }

  async getUserById(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await UsersServices.getUserById(req.params.id);
    if (user) {
      res.send(JSON.stringify(user));
    } else {
      res.send("Пользователь с указанным id не найден");
    }
  }

  async updateUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userIndex = await UsersServices.findUserIndexById(req.params.id);
    if (userIndex < 0) {
      res.send("Пользователь с указанным id не найден");
    } else {
      await UsersServices.updateUserByIndex(userIndex, req);
      res.send(JSON.stringify(await UsersServices.getUserById(req.params.id)));
    }
  }

  async updateUserPassword(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
