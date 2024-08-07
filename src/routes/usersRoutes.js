const express = require("express");
const router = express.Router();

const UsersControllers = require("../controllers/usersControllers");

const { body, param, query, header } = require("express-validator");

// Middleware для валидации данных
const validateBody = [
  body("username")
    .isLength({ min: 3 })
    .withMessage("Имя пользователя слишком короткое."),
  body("email").isEmail().withMessage("Невалидный email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Пароль должен содержать больше 5 символов"),
];

const validateParam = [
  param("id")
    .isLength({ min: 5 })
    .withMessage("Id пользователя слишком короткий."),
];

const validateQuery = [
  query("username")
    .isLength({ min: 3 })
    .withMessage("Имя пользователя слишком короткое."),
];

const validateHeader = [
    header("hidepassword")
      .isIn(['yes', 'no'])
      .withMessage("Значение hidepassword должно быть yes или no."),
  ];

// create
router.post("/", validateBody, UsersControllers.createUser);

// read
router.get("/query", validateQuery, UsersControllers.getUsers);

router.get("/header", validateHeader, UsersControllers.getUsers);

router.get("/", UsersControllers.getUsers);

router.get("/:id", validateParam, UsersControllers.getUserById);

// update
router.put("/:id", validateParam, validateBody, UsersControllers.updateUser);

router.patch(
  "/:id",
  validateParam,
  validateBody,
  UsersControllers.updateUserPassword
);

// delete
router.delete("/:id", validateParam, UsersControllers.deleteUser);

module.exports = router;
