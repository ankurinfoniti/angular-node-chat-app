const express = require('express');

const {
  createUser,
  postAuthenticate,
} = require('../../controllers/userController');

const router = express.Router();

router.post('/signup', createUser);
router.post('/login', postAuthenticate);

module.exports = router;
