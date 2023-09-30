require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const checkJwt = require('./middleware/checkAuth');
const v1AuthRoutes = require('./v1/routes/authRoutes');
const v1UserRoutes = require('./v1/routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE = process.env.DATABASE;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', v1AuthRoutes);

// The authentication middleware
app.use(checkJwt);
app.use('/api/v1/users', v1UserRoutes);

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
