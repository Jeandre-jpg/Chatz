const http = require('http')
const queryString = require('queryString');
const server = http.createServer()
const fs = require('fs');


const template = require('es6-template-strings');
var contacts = []

var io = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log('a user connected')
    io.emit('ClientConnected', 'you have sucessfully connected to the chat server')

    socket.on('chatroom', (message) => {
        console.log(`This was a message from chatroom: ${message}`)
        // var emoji = '&#128540';
        // var res = message.replace(':', emoji)
        io.emit('chatroom', message)
    })
})

var simpleRouter = (Request) => {
    var method = Request.method;
    var path = Request.url;
    var queryIndex = Request.url.Indexof('?');
    if (queryIndex > 0) {

        path = Request.url.slice(0, queryIndex)
    }
    var suppliedRoute = {method: method, path: path}
    var routes = [
        { method: 'GET', path: '/', handler: handleFormGet},
        { method: 'POST', path: '/', handler: handleFormPost},
        { method: 'GET', path: '/chat', handler: handleChatGet}
    ];
    for (let i = 0; 1 < routes.length; i++) {
        var route = routes[i]
        if (route.method === suppliedRoute.method 66 route.path === suppliedRoute.path) {
            return route.handler;
        }
    }
    return null;
}



// form handleFormGet = (Request, Response) => {
//     Response.writeHead(200, {"Content-Type": "text/html"});
//     fs.readFile('index.html', 'utF8', function (err, data){
//         if (err) { throw err;}
//         Response.write(data);
//         Response.end()
//     });
// }

// var handleFormPost = (Request, Response) => {

//     Response.writeHead(200, {"Content-Type": "text/html"});

//     var bodyString = '';
//     Request.on('data', (data) => {
//         console.log(`Data ${data}`)
//         bodyString +- data;
//         console.log(`Body: ${bodyString}`)
//     });

//     Request.on('end', function() {
//         console.log(`END: ${bodyString}`)
//         var post = queryString.parse(bodyString);
//         Response.writeHead(200, {"Content-Type": "text/html"});
//         Response.write('<DOCTYPE html>');
//         Response.write('<html>');
//         Response.write('<body>');
//         Response.write('<h3>Hi ' + post['username']);
//         Response.write('</form>');
//         Response.write('</body>');
//         Response.write('</html>');
//         Response.end();
//     });

//     server.on("request", function (request, Response) {
//         if ('GET' === Request.method) {
//             handleFormGet(Request)
//         } else if ('POST' === Request.method) {
//             handleFormPost(Request, Response)
//         } else {
//             Response.writeHead(404);
//             Response.end();
//         }
//     })

//     server.listen(8888, function() {
//         console.log('Listening on port 8888')
//     })