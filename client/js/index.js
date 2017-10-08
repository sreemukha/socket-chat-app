var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');

});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(msg) {
  console.log('New message', msg);
  var li = jQuery('<li id="individual-msg"></li>');
  li.text(`${msg.from}: ${msg.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(msg){
  var li = jQuery('<li id="location-msg"></li>');
  var a = jQuery('<a target="_blank">My Location</a>')
  li.text(`${msg.from}: `);
  a.attr('href',msg.url);
  li.append(a);
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

var locationButton = jQuery('#send-location');
locationButton.on('click',function (){
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by the browser');
  }

  navigator.geolocation.getCurrentPosition(function (position){
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function (err) {
    alert('Unable to fetch location', err);
  })

})
