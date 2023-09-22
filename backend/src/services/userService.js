const User = require('../models/user');

const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    await newUser.save();
  } catch (error) {
    return error;
  }
};

module.exports = { createUser };
