var app = require('http').createServer(response);
var fs = require('fs');
var io = require('socket.io')(app);
var fs =  require('fs'); 

app.listen(3000);
console.log("App running...");

function response(req, res) {
    var file = "";
    if(req.url == "/"){
	   file = __dirname + '/index.html';
    } else {
	   file = __dirname + req.url;
    }
   
    fs.readFile(file,
	    function (err, data) {
			if (err) {
				res.writeHead(404);
				return res.end('Page or file not found');
			}

			res.writeHead(200);
			res.end(data);
	    }
    );
}

var simpleRouter = function(request) {
	var method = request.method;
	var path = request.url;
	var suppliedRoute = {method: method, path: path}
	var routes = [
	  {method: 'GET', path: '/', handler: handleFormGet},
	  {method: 'POST', path: '/', handler: handleFormPost}
	];
	for (var i = 0; i < routes.length; i++) {
	  var route = routes[i];
	  if ( route.method === suppliedRoute.method &&
		route.path === suppliedRoute.path ) {
		return route.handler;
	  }
	}
	return null;
  }

  var handleFormPost = function(request, response) {
	response.writeHead(200, {"Content-Type": "text/html"});
	var payload = '';
  
	request.on('data', function (data) {
	  payload += data;
	});
  
	request.on('end', function () {
	  var post = queryString.parse(payload);
	  contacts.push(post['username']);
	  response.writeHead(200, {"Content-Type": "text/html"});
	  fs.readFile('templates/contacts.html', 'utf8', function(err, data) {
		if (err) { throw err; }
		var compiled = template(data, {username: post['username'], userList: contacts.join(",")});
		response.write(compiled);
		response.end();
	  });
	});
  }
  
  var method = request.method;
var path = request.url;
var queryIndex = request.url.indexOf('?');
if (queryIndex >= 0) {
  path = request.url.slice(0, queryIndex)
}
var suppliedRoute = {method: method, path: path}

io.on("connection", function(socket){
    socket.on("send message", function(sent_msg, callback){
		sent_msg = "[ " + getCurrentDate() + " ]: " + sent_msg;

		io.sockets.emit("update messages", sent_msg);
		callback();
    });
});

function getCurrentDate(){
	var currentDate = new Date();
	var day = (currentDate.getDate()<10 ? '0' : '') + currentDate.getDate();
	var month = ((currentDate.getMonth() + 1)<10 ? '0' : '') + (currentDate.getMonth() + 1);
	var year = currentDate.getFullYear();
	var hour = (currentDate.getHours()<10 ? '0' : '') + currentDate.getHours();
	var minute = (currentDate.getMinutes()<10 ? '0' : '') + currentDate.getMinutes();
	var second = (currentDate.getSeconds()<10 ? '0' : '') + currentDate.getSeconds();

	return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}

