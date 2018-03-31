const express = require('express');
const socket  = require('socket.io');

// App setup
const app = express();
const PORT = process.env.PORT || 8888;

const server = app.listen(PORT, () => console.log(`Hey the server's running on port: ${PORT}`));

// Static files
app.use(express.static('public'));

// Socket setup
const io = socket(server);

let userCount = 0;

io.on('connection', (socket) => {
  userCount++;

  // Cancels the "is typing" signal if the field is empty
  socket.on('cancel-typing', () => socket.broadcast.emit('cancel-typing'));

  // Shows "is typing" for when a user is typing a message
  socket.on('typing', (data) => {
      socket.broadcast.emit('typing', data);
  });

  // When the submit button is pressed the message is sent to all sockets
  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });

});
