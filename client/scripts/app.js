// YOUR CODE HERE:

window.currentUser = window.location.search.slice(10).split('%20').join(' ');

var app = {
  
  server: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
  
};

var holderMessage = {
  username: window.currentUser,
  text: '', 
  roomname: ''
};



//THIS ESSENTIALLY WILL BE IN INIT
$(document).ready(function() {
  //create while loop or something that loops through the fetched data
  // and sets each message into the div
  
  $('.userName').on('click', function() {
    console.log('does this button trigger');
    
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
    url: app.server,
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
    url: app.server,
    type: 'GET',
    // data:
    contentType: 'application/json',
    success: function (data) {
      // forEach the entire result array
        // for each object, send name and message to renderMessage
          // for each room property, send value to renderRoom
      var resultArray = data.results;
      resultArray.forEach((value) => {
        app.renderMessage(value);
      });    
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });

};
console.log(app.fetch());

app.clearMessages = function() {

  $('#chats').html('');
};

app.renderMessage = function(userObject) {
  //for each? the data 
  // grab each object and it's properties
    // append those property values to the webpage
    
  // loop through like twittler, all of the messages for a specific room,
    // creating it's div at each iteration, just like twittler.
    
  var username = userObject.username;
  var roomname = userObject.roomname;
  var message = userObject.text;
  //console.log('name ', username, ' message: ', message);
  $('#chats').append(`<div class= userName><p>${username}</p></div>`);
  
  //check roomname. append to appropriate room 
};

app.renderRoom = function(roomName) {
  $('#roomSelect').append(`<div class=${roomName}>` + roomName + '</div>');
  
};







// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };
















// var loggedInAs = 'Eric';