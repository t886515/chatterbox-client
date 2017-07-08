// YOUR CODE HERE:

window.currentUser = window.location.search.slice(10).split('%20').join(' ');

var app = {
  
  server: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
  
};

var holderMessage = {
  username: window.currentUser,
  text: '', 
  roomname: 'lobby'
};

window.friendList = {};
window.uniqueRoomNames = [];

app.init = function() {
  
  $(document).ready(function() {

    app.fetch(holderMessage.roomname);
    $('.currentRoom').text('Room: ' + holderMessage.roomname);
    
    $('#chats').on('click', '.username', function() {
      var userIDClicked = this.id;
      app.handleUsernameClick(userIDClicked);

    });

    $('.dropdown-menu').on('click', '.roomName', function() {
      app.clearMessages();
      app.fetch(this.id);
      holderMessage.roomname = this.id;
      $('.currentRoom').text('Room: ' + holderMessage.roomname);
    });
    
    $('#send').submit(function(event) {
      holderMessage.text = $('#message').val();
      event.preventDefault();
      app.handleSubmit();
      $('#message').val('');
    });

    $('#addRoom').on('click', function() {
      var newRoomName = $('#chatRoomName').val();
      if (uniqueRoomNames.indexOf(newRoomName) < 0) {
        uniqueRoomNames.push(newRoomName);
        app.renderRoom(newRoomName);
        $('#chatRoomName').val('');
      } else {
        alert('must add chat room name before proceeding');
      }
    
    });
    
    $('#refresh').on('click', function() {
      console.log(holderMessage.roomname);
      app.clearMessages();
      app.fetch(holderMessage.roomname);
    });
    
  });
  
};

app.handleUsernameClick = function(username) {
  
  if (friendList[username] === undefined || friendList[username] === false) {
    friendList[username] = true;
    app.clearMessages();
    app.fetch(holderMessage.roomname);
  } else {
    friendList[username] = false;
    app.clearMessages();
    app.fetch(holderMessage.roomname);      
  }

};



app.handleSubmit = function() {
  app.clearMessages();
  app.send(holderMessage);
  app.fetch(holderMessage.roomname);
};

app.send = function(message) {

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log(data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });

};

app.fetch = function(roomname) {

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'GET',
    data: {'order': '-createdAt'},
    contentType: 'application/json',
    success: function (data) {
      
      var resultArray = data.results;
      resultArray.forEach((value) => {
        app.getAllChatRooms(value);
        if (value.roomname === roomname) {
          app.renderMessage(value);
        }
      }); 
         
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });

};

app.getAllChatRooms = function(value) {
  
  if (uniqueRoomNames.indexOf(value.roomname) < 0) {
    uniqueRoomNames.push(value.roomname);
    app.renderRoom(value.roomname);
  }
};


app.clearMessages = function() {

  $('#chats').html('');
};

app.renderMessage = function(userObject) {
  var username = userObject.username;
  var roomname = userObject.roomname;
  var message = userObject.text;
  
  var $userNameNode = $('<a href="#"></a>');
  $userNameNode.text(username);
  $userNameNode.addClass('username');
  $userNameNode.attr('id', username);
  //console.log($userNameNode)
  if (friendList[username] === undefined || friendList[username] === false) {
    $userNameNode.css('font-weight', 'bold');
    $userNameNode.css('color', 'black');
  } else {
    $userNameNode.css('font-weight', 'bold');
    $userNameNode.css('color', 'blue');
  }
  var $messageNode = $('<p></p>');
  $messageNode.text(message);
  $('#chats').append($userNameNode);
  $('#chats').append($messageNode);
};

app.renderRoom = function(roomName) {
  
  $('#roomSelect').append(`<li><a href="#" class='roomName' id='${roomName}'>${roomName}</a></li>`);
};

