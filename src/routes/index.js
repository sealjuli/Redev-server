const express = require("express");

const userRoutes = require('./usersRoutes');
const helloRoutes = require('./helloRoutes');
const echoRoutes = require('./echoRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/hello', helloRoutes);
router.use('/echo', echoRoutes);

module.exports = router;