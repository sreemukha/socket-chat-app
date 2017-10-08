const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../client');

const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

// static middleware to serve static html in client folder
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and Room are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name,params.room);

    io.to(params.room).emit('updateOnlineUsers', users.getUserList(params.room));

    // socket.emit emits an event to single connection
    socket.emit('newMessage',generateMessage('King', 'Welcome to the chat'));

    socket.broadcast.to(params.room).emit('newMessage', generateMessage('King', `${params.name} has joined!`));

    callback();
  });

  // create message listener

  socket.on('createMessage', (msg, callback) => {
    console.log('createMessage',msg);

    const user = users.getUser(socket.id);
    if(user && isRealString(msg.text)){
      // io.emit emits event to every single connection
      io.to(user.room).emit('newMessage', generateMessage(user.name, msg.text));
    }
    callback();
  });

  // create location message listener

  socket.on('createLocationMessage', (coords) => {

    const user = users.getUser(socket.id);
    if(user){
      // io.emit emits event to every single connection
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name,coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateOnlineUsers', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('King', `${user.name} has left the room!`));
    }
  });
});




server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
