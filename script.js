// const socket = io('http://localhost:8000')
// const messageContainer = document.getElementById('message-container')
// const messageForm = document.getElementById('send-container')
// const messageInput = document.getElementById('message-input')

  
var http = require('http');
var queryString = require('querystring'); 
var fs =  require('fs');

// var server = http.createServer();

// var handleFormGet = function(request, response) {
//   response.writeHead(200, {"Content-Type": "text/html"});
//   fs.readFile('templates/form.html', 'utf8', function(err, data) {
//     if (err) { throw err; }
//     response.write(data);
//     response.end();
//   });
// }

// socket.on('chat-message', data => {
//   appendMessage(`${data.name}: ${data.message}`)
// })

// socket.on('user-connected', name => {
//   appendMessage(`${name} connected`)
// })

// socket.on('user-disconnected', name => {
//   appendMessage(`${name} disconnected`)
// })

// messageForm.addEventListener('submit', e => {
//   e.preventDefault()
//   const message = messageInput.value
//   appendMessage(`You: ${message}`)
//   socket.emit('send-chat-message', message)
//   messageInput.value = ''
// })

// function appendMessage(message) {
//   const messageElement = document.createElement('div')
//   messageElement.innerText = message
//   messageContainer.append(messageElement)
// }

