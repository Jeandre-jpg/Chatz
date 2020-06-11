// const http = require('http')
// const queryString = require('querystring');
// const server = http.createServer()
// var fs = require('fs');

// var handleFormGet = (Request, Response) => {
// 	  response.writeHead(200, {"Content-Type": "text/html"});
// 	  fs.readFile('chat.html', 'utf8', function(err, data) {
// 		if (err) { throw err; }
//         response.write(data);
//         response.end();
// 	  });
// }

// var handleFormPost = (Request, Response) => {
//     response.writeHead(200, {"Content-Type": "text/html"});
//    var bodyString = '';
//    Request.on('data', (data) => {
//        Console.log(`Data ${data}`)
//        bodyString += data;
//     });
// }