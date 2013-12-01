var io = require('socket.io').listen(8080);

io.sockets.on('connection', function (socket) {
    sendNewsFlash();

    socket.on('start', function (data) {
        sendNewsFlash();
    });
});


function sendNewsFlash(){

    setTimeout( function(){
        io.sockets.emit('news', { news: 'The latest news update' })
    }, 1000);

    setTimeout( function(){
        io.sockets.emit('news', { news: 'LIVE' })
    }, 2000);

    setTimeout( function(){
        io.sockets.emit('news', { news: 'In Real Time' })
    }, 3000);
}