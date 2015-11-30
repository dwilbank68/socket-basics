var socket = io();

socket.on('connect', function(){
    console.log('connected to socket.io server');
});

socket.on('message', function(message){

    var momentTimestamp = moment.utc(message.timestamp);
    console.log(momentTimestamp);
    var formattedTime = momentTimestamp.local().format('YYYY-MM-DD hh:mma');
    //console.log(formattedTime);
    console.log(message.text);

    $('.messages')
        .append('<p>'+formattedTime+' - '+message.text+'</p>');
});


// handles submitting of new message
var $form = $('#message-form');

$form.on('submit', function(event){
    event.preventDefault();

    socket.emit('message', {
        text: $form.find('input[name=message]').val()
    });

    $form.find('input[name=message]').val('');
});