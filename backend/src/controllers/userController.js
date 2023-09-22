const userService = require('../services/userService');

exports.createUser = async (req, res) => {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    userService.createUser(userData);

    return res.json({ message: 'User created!!' });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'There was a problem creating your account' });
  }
};
