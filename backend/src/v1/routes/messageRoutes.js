const express = require('express');

const {
  getAllMessage,
  getMessageUsers,
  saveMessage,
} = require('../../controllers/messageController');

const router = express.Router();

router.post('/', getAllMessage);
router.get('/users', getMessageUsers);
router.post('/save', saveMessage);

module.exports = router;
