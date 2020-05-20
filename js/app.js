// const io = require('socket.io')(http);


// let route = io.connect('http://localhost:3000/route');

// // route.on('welcome', (msg) => {
// //     console.log('Received: ', msg);
// // });

// // route.emit('joinRoom', 'friendly')


// // route.on('newUser', (res) => console.log(res));

// // route.on('err', (err) => console.log(err));

// // route.on('success', (res) => console.log(res));


// const userName = 'Jeandre De Villiers';

// let chat = io.connect('http://localhost:3000/chat');

// function sendMessage(){
//     let msg = document.getElementById('chat-input').value;
//     console.log('Message: ', msg);

//     input.value= ';'

//     chat.emit('newMsg',  {userName, msg});
// }

// function addMessage(container, data){
//     let elm = document.getElementById("p");
//     elm.textContent = `${data.userName}: ${data.msg}`;
//     container.appendChild(elm);
// }

// chat.on('newMessage', (data) => {
//     console.log(`New message received from user: , ${data.userName}: ${data.msg}`);
// });

// const btn = document.getElementById('submissionBtn');

// btn.onclick = () => {
//     sendMessage();
// }


// let container = document.getElementById('container');