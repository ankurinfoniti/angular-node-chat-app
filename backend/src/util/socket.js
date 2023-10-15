const { Server } = require('socket.io');

const io = new Server({
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
  },
});

const Socket = {
  emit: function (event, data) {
    console.log(event, data);
    io.sockets.emit(event, data);
  },
};

io.on('connection', function (socket) {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

exports.Socket = Socket;
exports.io = io;
