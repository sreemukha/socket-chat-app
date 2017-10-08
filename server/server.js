const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../client');

const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

// static middleware to serve static html in client folder
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');



  // create message listener

  socket.on('createMessage', (msg) => {
    console.log('createMessage',msg);

    // socket.emit emits an event to single connection

    // io.emit emits event to every single connection
    io.emit('newMessage', {
      from: msg.from,
      text:msg.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
