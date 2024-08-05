const express = require("express");
const router = express.Router();

const UsersControllers = require('../controllers/usersControllers')

// create
router.post("/", UsersControllers.createUser);

// read
router.get("/", UsersControllers.getUsers);

router.get("/:id", UsersControllers.getUserById);

// update
router.put("/:id", UsersControllers.updateUser);

router.patch("/:id", UsersControllers.updateUserPassword);

// delete
router.delete("/:id", UsersControllers.deleteUser);

module.exports = router;
