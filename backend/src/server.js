require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const checkJwt = require('./middleware/checkAuth');
const v1AuthRoutes = require('./v1/routes/authRoutes');
const v1UserRoutes = require('./v1/routes/userRoutes');
const v1MessageRoutes = require('./v1/routes/messageRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE = process.env.DATABASE;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', v1AuthRoutes);

// The authentication middleware
app.use(checkJwt);
app.use('/api/v1/users', v1UserRoutes);
app.use('/api/v1/messages', v1MessageRoutes);

async function connect() {
  try {
    await mongoose.connect(DATABASE);
  } catch (error) {
    console.log('Mongoose error', error);
  }
}

connect();

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
