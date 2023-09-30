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

const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    await newUser.save();
  } catch (error) {
    return error;
  }
};

module.exports = { getUser, createUser };
