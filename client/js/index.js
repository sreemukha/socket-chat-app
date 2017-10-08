var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');

});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(msg) {
  console.log('New message', msg);
  var li = jQuery('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);
  jQuery('#messages').append(li);
});


jQuery('#msg-form').on('submit', function(ev){
  ev.preventDefault();
  socket.emit('createMessage',{
    from: 'User',
    text: jQuery('[name=msg]').val()
  }, function () {

  });
});
