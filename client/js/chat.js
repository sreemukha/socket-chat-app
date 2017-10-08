var socket = io();

function autoScroll() {
  // Selectors
  var msgs = jQuery('#messages');
  var newMessage = msgs.children('li:last-child');
  // heights
  var clientHeight = msgs.prop('clientHeight');
  var scrollTop = msgs.prop('scrollTop');
  var scrollHeight = msgs.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();
  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    msgs.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {
  console.log('Connected to server');
  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function(err){
    if(err){
      alert(err)
      window.location.href = '/'
    } else{
      console.log('All ok!');
    }
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('updateOnlineUsers', function(users){
  var ol = jQuery('<ol></ol>');
  users.forEach(function(user){
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);
});

socket.on('newMessage', function(msg) {
  var template = jQuery('#msg-template').html();
  var formattedTime = moment(msg.createdAt).format('h:mm a');
  var html = Mustache.render(template,{
    text: msg.text,
    from: msg.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  autoScroll();
  // console.log('New message', msg);

  // without mustache
  // var li = jQuery('<li id="individual-msg"></li>');
  // li.text(`${msg.from}, ${formattedTime}: ${msg.text}`);
  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(msg){
  var formattedTime = moment(msg.createdAt).format('h:mm a');
  var template = jQuery('#location-msg-template').html();
  var html = Mustache.render(template,{
    url: msg.url,
    from: msg.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  autoScroll();
  // without mustache
  // var li = jQuery('<li id="location-msg"></li>');
  // var a = jQuery('<a target="_blank">My Location</a>')
  // li.text(`${msg.from}, ${formattedTime}: `);
  // a.attr('href',msg.url);
  // li.append(a);
  // jQuery('#messages').append(li);

});


jQuery('#msg-form').on('submit', function(ev){
  ev.preventDefault();

  var messageInput = jQuery('[name=msg]');

  socket.emit('createMessage',{
    text: messageInput.val()
  }, function () {
      messageInput.val('');
      messageInput.attr('autofocus');
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
