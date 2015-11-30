var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
    console.log('user connected via socket.io');

    socket.on('message', function(message){
        console.log("MSG RECEIVED: ", message.text);
        // io.emit would send it to everyone, including sender
        socket.broadcast.emit('message', message);
    });

    socket.emit('message', {
        text:'Welcome to the chat app'
    });

});

http.listen(PORT, function () {
    console.log('server started');
});