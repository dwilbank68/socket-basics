var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');

var socket = io();

socket.on('connect', function(){
    console.log('connected to socket.io server');
});

socket.on('message', function(message){
    var momentTimestamp = moment.utc(message.timestamp);
    var $message = $('.messages');
    var formattedTime = momentTimestamp
        .local()
        .format('YYYY-MM-DD - hh:mma');
    //console.log(formattedTime);
    console.log(message.text);

    $message.append('<p><strong>'+message.name+' '+formattedTime+'</strong></p>');
    $message
        .append('<p>'
            +message.text
            +'</p>');
});


// handles submitting of new message
var $form = $('#message-form');

$form.on('submit', function(event){
    event.preventDefault();

    socket.emit('message', {
        name: name,
        text: $form.find('input[name=message]').val()
    });

    $form.find('input[name=message]').val('');
});