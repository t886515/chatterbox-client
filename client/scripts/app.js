// YOUR CODE HERE:

window.currentUser = window.location.search.slice(10).split('%20').join(' ');

var app = {
  
  server: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
  
};

var holderMessage = {
  username: window.currentUser,
  text: '', 
  roomname: '1'
};
console.log(holderMessage.roomname);

var friendList = [];

//THIS ESSENTIALLY WILL BE IN INIT
$(document).ready(function() {
  //create while loop or something that loops through the fetched data
  // and sets each message into the div
  
  $('.userName').on('click', function() {
    console.log('does this button trigger');
    
  });
  
  $("#chats").on("click", ".username", function(){
    //var addUser = $("this").attr('id');
    var userIDClicked = this.id;
    //console.log(this.id);
    friendList.push(userIDClicked);
    console.log(friendList);
    // var $section = $('section');
    // img = `<article class='afterClick'><p class='clickable'>Wanna play <a href="ext1.html">Rock-Paper-Scissors?</a></p><img src="stylesheet/teddy2.png" alt="bear" id="secondbear"</article>>`
    // $section.append(img);
  })

  $(".dropdown-menu").on("click", ".roomName", function(){
    console.log(this.id);
    app.fetch(this.id)
    holderMessage.roomname = this.id;
    //app.filterMessageByRoom(this.id);
  })

  $("#submitButton").on("click", function(){
    //console.log($('#messageText').val());

    holderMessage.text = $('#messageText').val();
    console.log(holderMessage.text);
    console.log(holderMessage);
    app.send(holderMessage);

  }) 
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

app.fetch = function(roomname) {

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'GET',
    data: {'order': "-createdAt"},
    contentType: 'application/json',
    success: function (data) {
      // forEach the entire result array
        // for each object, send name and message to renderMessage
          // for each room property, send value to renderRoom
      var resultArray = data.results;
      resultArray.forEach((value) => {
        if (value.roomname === roomname) {
          app.renderMessage(value);
        }
      });
      app.renderRoom('superLobby');    
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
  // var $div = $('#chats');
  // var $divBody = $('<div class=user></div>')
  // $divBody.html('<div id = ' + username + '><h3 id = allNames> ' + username + '</h3> <p id = allMessages>' + message + '</p></div>');
  // $divBody.appendTo($div);

  $('#chats').append(`<div><a href='#' class='username' id='${username}'>${username}</a> says:</div><p> ${message}</p>`);
  
  //check roomname. append to appropriate room 
};

app.filterMessageByRoom = function(userObject, roomname) {
if (userObject.roomname === roomname) {
  var username = userObject.username;
  var message = userObject.text;
  $('#chats').append(`<div><a href='#' class='username' id='${username}'>${username}</a> says:</div><p> ${message}</p>`);
}
}



app.renderRoom = function(roomName) {
  $('.dropdown-menu').append(`<li><a href="#" class='roomName' id='${roomName}'>${roomName}</a></li>`)
 
  //$('#roomSelect').append(`<div class=${roomName}>` + roomName + '</div>');
  
};







// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };
















// var loggedInAs = 'Eric';