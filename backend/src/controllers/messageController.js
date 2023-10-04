const messageService = require('../services/messageService');

const getAllMessage = async (req, res) => {
  try {
    const senderId = req.userData.userId;
    const receiverId = req.body.receiverId;
    const page = req.body.page;

    const messages = await messageService.getAllMessage(
      senderId,
      receiverId,
      page
    );

    return res.json(messages);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong.' });
  }
};

const getMessageUsers = async (req, res) => {
  try {
    const senderId = req.userData.userId;

    const users = await messageService.getMessageUsers(senderId);

    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong.' });
  }
};

const saveMessage = async (req, res) => {
  try {
    const senderId = req.userData.userId;
    const receiverId = req.body.receiverId;
    const message = req.body.message;

    const messageData = await messageService.saveMessage({
      senderId,
      receiverId,
      message,
    });

    return res.json(messageData);
  } catch (error) {
    console.log('error');
    return res.status(400).json({ message: 'Something went wrong.' });
  }
};

module.exports = { getAllMessage, getMessageUsers, saveMessage };
