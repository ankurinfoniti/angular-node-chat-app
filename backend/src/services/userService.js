const User = require('../models/user');

const getUser = async (email) => {
  try {
    return await User.findOne({
      email: email,
    });
  } catch (error) {
    return error;
  }
};

const getAllUsers = async () => {
  try {
    return await User.find({}).sort({ name: 'asc' });
  } catch (error) {
    return error;
  }
};

const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    await newUser.save();
  } catch (error) {
    return error;
  }
};

const updateLastLogin = async (id) => {
  try {
    return await User.findOneAndUpdate({ _id: id }, { lastLogin: new Date() });
  } catch (error) {
    return error;
  }
};

module.exports = { getAllUsers, getUser, createUser, updateLastLogin };
