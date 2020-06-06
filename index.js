const http = require('http')
const queryString = require('queryString');
const server = http.createServer()
var fs = require('fs');

form handleFormGet = (Request, Response) => {
    Response.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile('index.html', 'utF8', function (err, data){
        if (err) { throw err;}
        Response.write(data);
        Response.end()
    });
}

var handleFormPost = (Request, Response) => {

    Response.writeHead(200, {"Content-Type": "text/html"});

    var bodyString = '';
    Request.on('data', (data) => {
        console.log(`Data ${data}`)
        bodyString +- data;
        console.log(`Body: ${bodyString}`)
    });

    Request.on('end', function() {
        console.log(`END: ${bodyString}`)
        var post = queryString.parse(bodyString);
        Response.writeHead(200, {"Content-Type": "text/html"});
        Response.write('<DOCTYPE html>');
        Response.write('<html>');
        Response.write('<body>');
        Response.write('<h3>Hi ' + post['username']);
        Response.write('</form>');
        Response.write('</body>');
        Response.write('</html>');
        Response.end();
    });

    server.on("request", function (request, Response) {
        if ('GET' === Request.method) {
            handleFormGet(Request)
        } else if ('POST' === Request.method) {
            handleFormPost(Request, Response)
        } else {
            Response.writeHead(404);
            Response.end();
        }
    })

    server.listen(8888, function() {
        console.log('Listening on port 8888')
    })