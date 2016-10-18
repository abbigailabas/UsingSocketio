// Include our libraries
var http = require('http');
var path = require('path');
var socketio = require('socket.io');
var express = require('express');
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);
// Use router to point requests to the 'client' folder 
router.use(express.static(path.resolve(__dirname, 'website')));
// Variables to hold the messages and the sockets
var messages = [];
var sockets = [];
io.on('connection', function (socket) {
    console.log('a user connected');
    
    socket.on('button pressed', function (msg) {
        io.emit('button pressed', msg);
        console.log(msg);
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
// Start our server
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    var addr = server.address();
    console.log("Our server is listening at", addr.address + ":" + addr.port);
});
