const Message = require('../models/message');
const User = require('../models/user');

const getAllMessage = async (senderId, receiverId, page) => {
  try {
    const limit = 5;
    const skip = (page - 1) * limit;

    return await Message.find({
      $or: [
        { $and: [{ senderId: senderId, receiverId: receiverId }] },
        { $and: [{ senderId: receiverId, receiverId: senderId }] },
      ],
    })
      .sort({ _id: -1 })
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

    const senderIds = await Message.find({ receiverId: senderId }).distinct(
      'senderId'
    );

    return await User.find()
      .select('_id name email lastLogin')
      .where('_id')
      .in([...senderIds, ...receiverIds]);
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
