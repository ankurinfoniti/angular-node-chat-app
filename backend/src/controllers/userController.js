const userService = require('../services/userService');
const { hashPassword } = require('../util/hashing');

exports.createUser = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);

    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };

    const user = await userService.createUser(userData);

    return res.json({ message: 'User created!!' });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'There was a problem creating your account' });
  }
};
