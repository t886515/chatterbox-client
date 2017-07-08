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

//THIS ESSENTIALLY WILL BE IN INIT
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

app.handleSubmit = function(value) {
  
  app.send(holderMessage);
  app.fetch(holderMessage.roomname);
};

app.init = function() {
  
  $(document).ready(function() {
    //create while loop or something that loops through the fetched data
    // and sets each message into the div
    app.fetch(holderMessage.roomname);
    $('.currentRoom').text('Room: ' + holderMessage.roomname);
    
    $('#chats').on('click', '.username', function() {
      //var addUser = $("this").attr('id');
      var userIDClicked = this.id;
      app.handleUsernameClick(userIDClicked);
      // console.log(this.id);

      //console.log(friendList);
      // var $section = $('section');
      // img = `<article class='afterClick'><p class='clickable'>Wanna play <a href="ext1.html">Rock-Paper-Scissors?</a></p><img src="stylesheet/teddy2.png" alt="bear" id="secondbear"</article>>`
      // $section.append(img);
    });

    $('.dropdown-menu').on('click', '.roomName', function() {
      // console.log(this.id);
      app.clearMessages();
      app.fetch(this.id);
      //app.getAllRoom();
      holderMessage.roomname = this.id;
      $('.currentRoom').text('Room: ' + holderMessage.roomname);
      //app.filterMessageByRoom(this.id);
    });
    // $('.dropdown-menu').on('click', function() {
    //    console.log('tr');
    //   holderMessage.roomname = this.id;
    //   //app.filterMessageByRoom(this.id);
      
    // })
    
    
    $('#send').submit(function(event) {
      
      holderMessage.text = $('#message').val();
      event.preventDefault();
      app.handleSubmit($('#message').val());
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
    // $(".test a").click(function(){
    //   //var addUser = $(".username");
    //   console.log('HI')
    //   console.log($(this).attr('id'));
    //   // var $section = $('section');
    //   // img = `<article class='afterClick'><p class='clickable'>Wanna play <a href="ext1.html">Rock-Paper-Scissors?</a></p><img src="stylesheet/teddy2.png" alt="bear" id="secondbear"</article>>`
    //   // $section.append(img);
    // })
    
    
    
    // $('#testButton').on('click', function() {
    //   var $node = $('#chats');
    //   $node.append(`<p> ${window.currentUser} </p>`);
    //   console.log('i was clicked')
    // });
    
    
    //a button to add all recent message's chatroom to our chatroom
    //**things need to be changed outside: need an array to store all the current room list
    //when button is click:
    //1) 
    
    
  });
  
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
      // forEach the entire result array
        // for each object, send name and message to renderMessage
          // for each room property, send value to renderRoom
      
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
  //console.log(friendList);
  // $('#chats').append(`<div><a href='#' class='username' id='${username}'>${username}</a> says:</div><p> ${message}</p>`);
};

// app.filterMessageByRoom = function(userObject, roomname) {
//   if (userObject.roomname === roomname) {
//     var username = userObject.usernme;
//     var message = userObject.text;
//     $('#chats').append(`<div><a href='#' class='username' id='${username}'>${username}</a> says:</div><p> ${message}</p>`);
//   } 
// };



app.renderRoom = function(roomName) {
  $('.dropdown-menu').append(`<li><a href="#" class='roomName' id='${roomName}'>${roomName}</a></li>`);
 
  //$('#roomSelect').append(`<div class=${roomName}>` + roomName + '</div>');
  
};







// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };
















// var loggedInAs = 'Eric';