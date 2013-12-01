var socket = io.connect('http://localhost:8080');

socket.on('news', function (data) {
    update(data['news'])
    console.log(data);

    //socket.emit('my other event', { my: 'data' });
});

function update(data){
    $('#items li:first a').html(data);
}

$('#filter li a[href="#news"]').click(function(){
    socket.emit('start', { command: 'news' });
});

$('#filter li a[href="#show-all"]').click(function(){
    socket.emit('start', { command: 'all' });
});



