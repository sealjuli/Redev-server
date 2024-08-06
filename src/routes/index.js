const express = require("express");

const usersRoutes = require('./usersRoutes');
const helloRoutes = require('./helloRoutes');
const echoRoutes = require('./echoRoutes');
const booksRoutes = require('./booksRoutes');

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/hello', helloRoutes);
router.use('/echo', echoRoutes);
router.use('/books', booksRoutes);

module.exports = router;