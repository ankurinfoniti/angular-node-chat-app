require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const { io } = require('./util/socket');
const checkJwt = require('./middleware/checkAuth');
const v1AuthRoutes = require('./v1/routes/authRoutes');
const v1UserRoutes = require('./v1/routes/userRoutes');
const v1MessageRoutes = require('./v1/routes/messageRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE = process.env.DATABASE;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', v1AuthRoutes);

// The authentication middleware
app.use(checkJwt);
app.use('/api/v1/users', v1UserRoutes);
app.use('/api/v1/messages', v1MessageRoutes);

io.use((socket, next) => {
  const email = socket.handshake.auth.email;

  if (!email) {
    return next(new Error('invalid email'));
  }

  socket.email = email;
  next();
});

async function connect() {
  try {
    await mongoose.connect(DATABASE);
  } catch (error) {
    console.log('Mongoose error', error);
  }
}

connect();

const server = app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});

io.attach(server);
