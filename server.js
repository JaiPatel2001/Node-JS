var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

/*io.on('connection', socket => {
    console.log('new user')
    socket.emit('chat-message','Welcome')
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message',message)
    })
} )
*/

app.get('/', (req, res) => {
    res.sendFile('D:/Node/node-v10.16.3/Chat/index.html')
 })

 io.on('connection', (socket) => {
     console.log('user '+socket.id);
    socket.on('chat message', (msg) => {
        const time = new Date();
        const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" }); 
        const message = socket.id+'>>'+formattedTime +" : "+msg
        console.log('message '+message)
      io.emit('chat message', message);
    });
    
  });



http.listen(3000, function() {
    console.log('listening on *:3000');
 });

