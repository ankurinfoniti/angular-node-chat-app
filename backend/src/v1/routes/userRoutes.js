const express = require('express');

const { getAllUsers } = require('../../controllers/userController');

const router = express.Router();

router.post('/', getAllUsers);

module.exports = router;
