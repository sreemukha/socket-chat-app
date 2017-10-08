var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');

});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(msg) {
  console.log('New message', msg);
  var formattedTime = moment(msg.createdAt).format('h:mm a');
  var li = jQuery('<li id="individual-msg"></li>');
  li.text(`${msg.from}, ${formattedTime}: ${msg.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(msg){
  var formattedTime = moment(msg.createdAt).format('h:mm a');
  var li = jQuery('<li id="location-msg"></li>');
  var a = jQuery('<a target="_blank">My Location</a>')
  li.text(`${msg.from}, ${formattedTime}: `);
  a.attr('href',msg.url);
  li.append(a);
  jQuery('#messages').append(li);

});


jQuery('#msg-form').on('submit', function(ev){
  ev.preventDefault();

  var messageInput = jQuery('[name=msg]');

  socket.emit('createMessage',{
    from: 'User',
    text: messageInput.val()
  }, function () {
      messageInput.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function (){
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by the browser');
  }

  locationButton.attr('disabled','disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position){
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function (err) {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location', err);
  })

})
