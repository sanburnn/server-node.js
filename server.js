const express = require('express'),
http = require('http'),
app = express(),
server = http.createServer(app),
io = require('socket.io').listen(server);
app.get('/',(req, res) => {

res.send('Chat Server is Runing on port 3000')
});

//main program Slurddd

io.on('connection', (socket) => {
console.log('user connected')
socket.on('join', function(userNickname){
    console.log(userNickname +" : has join the chat " );
    socket.broadcast.emit('userjoinedthechat',userNickname +" : has joined the chat");
});

socket.on('messagedetection',(senderNickname,messageContent) => {
    // log the message in console

    console.log(senderNickname+" :" +messageContent)
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

server.listen(3000,()=>{

    console.log('Node app is running on port 3000');
    
    });
//server
/*you can modify the server as you wishh
this is just example
*/














