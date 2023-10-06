const jwt = require('jsonwebtoken');

const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: '1h',
    }
  );
};

module.exports = { createToken };
