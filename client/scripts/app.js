// YOUR CODE HERE:

window.currentUser = window.location.search.slice(10).split('%20').join(' ');

var app = {
  
};

var holderMessage = {
  username: window.currentUser,
  text: '', 
  roomname: ''
};

console.log(document.getElementById('messageText'));

$(document).ready(function() {
  //create while loop or something that loops through the fetched data
  // and sets each message into the div
  
  $('#testButton').on('click', function() {
    var x = document.getElementById('messageText').value;
    holderMessage.text = x;
    console.log(holderMessage.text);
  });
  
  // $('#testButton').on('click', function() {
  //   var $node = $('#chats');
  //   $node.append(`<p> ${window.currentUser} </p>`);
  //   console.log('i was clicked')
  // });
  
  
  
});

app.init = function() {

  
};

app.send = function(message) {

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });

};

app.fetch = function() {

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: undefined,
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });

};

app.clearMessages = function() {
  
  $('#chats').html('');
};

app.renderMessage = function(message) {
  $('#chats').append(`<p>${message}</p>`);
};

app.renderRoom = function(roomName) {
  $('#roomSelect').append('<blink>' + roomName + '</blink>');
};







// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };
















// var loggedInAs = 'Eric';