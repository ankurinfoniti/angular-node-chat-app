const userService = require('../services/userService');
const { hashPassword, verifyPassword } = require('../util/hashing');
const { createToken } = require('../util/jwt');

exports.postAuthenticate = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await userService.getUser(email);

    if (!user) {
      return res.status(403).json({ message: 'User does not exists.' });
    }

    const passwordValid = await verifyPassword(password, user.password);

    if (!passwordValid) {
      return res.status(403).json({ message: 'Password did not match.' });
    }

    const token = createToken(user);

    // update last login
    await userService.updateLastLogin(user._id);

    return res.json({ message: 'Authentication successful!', token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong.' });
  }
};

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

exports.getAllUsers = async (req, res) => {
  try {
    const id = req.body.id;
    const users = await userService.getAllUsers(id);

    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong.' });
  }
};
