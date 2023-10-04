const Message = require('../models/message');
const User = require('../models/user');

const getAllMessage = async (senderId, receiverId, page) => {
  try {
    const limit = 2;
    const skip = (page - 1) * limit;

    return await Message.find({ senderId: senderId, receiverId: receiverId })
      .skip(skip)
      .limit(limit);
  } catch (error) {
    return error;
  }
};

const getMessageUsers = async (senderId) => {
  try {
    const receiverIds = await Message.find({ senderId: senderId }).distinct(
      'receiverId'
    );

    return await User.find()
      .select('_id name email lastLogin')
      .where('_id')
      .in(receiverIds);
  } catch (error) {
    return error;
  }
};

const saveMessage = async (message) => {
  try {
    const newMessage = new Message(message);

    return await newMessage.save();
  } catch (error) {
    return error;
  }
};

module.exports = { getAllMessage, getMessageUsers, saveMessage };
