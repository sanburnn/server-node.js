const express = require('express'),
http = require('http'),
app = express(),
server = http.createServer(app),
io = require('socket.io').listen(server);
app.get('/',(req, res) => {

res.send('Chat Server is Runing on port 007')
});
io.on('connection', (socket) => {
console.log('user connected')
socket.on('join', function(userNickname){
    console.log(userNickname +" : has join the chat " );
    socket.broadcast.emit('userjoinedthechat',userNickname +" : has joined the chat");
});

socket.on('messagedetection',(senderNickname,messageContent) => {
    // log the message in console

    console.log(sendernickname+" :" +messageContent)
    //create a message object
    let message = {"message":messageContent, "senderNickname":senderNickname}
    //send message to the client side
    io.emit('message',message);
});

socket.on('disconnect', function() {
    console.log( ' user has left ')
    socket.broadcast.emit("userdisconnect"," user has left")

});

});

//server














