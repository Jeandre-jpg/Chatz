// const express = require('express');
// const app = express();
// const port = 3000;
// const http = require('http').createServer();


// const io = require('socket.io')(http);

// // io.on('connection', (socket) => {

// //     socket.emit('welcome', 'Hello World');

// //     console.log('New client is connected');

// // });

// // const chatRooms = ['friendly', 'professional', 'new'];

// // io.of('/route')
// // .on('connection', (socket) => {
// //     console.log('New Client');
// //     socket.emit('welcome', 'Hello and welcome to the Chat area!');


// //     socket.on('joinRoom', (room) => {
// //         if(chatRooms.includes(room)){
// //             socket.join(room)
// //             io.of('/route')
// //             .in(room).emit('newUser', 'A new user has joined the ' + room + ' chat room');
// //             return socket.emit('success', 'You have successfully joined this room.');
// //         }else {
// //             return socket.emit('err', 'ERROR, no room named: ' + room);
// //         }

// //         socket.disconnect();


        
// //     });


// // });


// io.of('/chat').on('connection', (socket) => {

//     socket.on('newMsg', (data) => {

//         console.log(`Message received from user: ${data.username}: ${data.msg}`);
//         socket.emit('newMessage', data);
//     });
// });



// http.listen(port, () => {
//     console.log('Server is on localhost', port);
// })

const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCord Bot';

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));