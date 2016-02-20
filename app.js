var http = require('http');

var fs = require('fs');


// Loading the index file . html displayed to the client

var server = http.createServer(function(req, res) {

    fs.readFile('./index.html', 'utf-8', function(error, content) {

        res.writeHead(200, {"Content-Type": "text/html"});

        res.end(content);

    });

});

var io = require('socket.io').listen(server);
var i;
var exec = require('child_process').exec;


io.sockets.on('connection', function (socket) {
    counts=0;
	prev=0;
	var filePath="foo.txt";
	socket.emit('message', 'You are connected!');
	setInterval(function(){
		exec('wc -l < foo.txt', function (error, results) {
			counts=results;
	});
	if(counts>prev) {
		fs.readFile("foo.txt", {encoding: 'utf-8'}, function(err,data){
    if (!err){
    socket.emit('message', data);
    }else{
    	console.log("hello");
        console.log(err);
    }

});		p=counts;
		}
	}, 5000);
	socket.emit('message', 'You are connected!');
});

server.listen(8080);