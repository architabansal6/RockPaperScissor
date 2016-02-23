//calling packages
var express = require('express');    //call express
var app = express(); 
var server = require('http').createServer(app);
var fs = require('fs');
var io = require('socket.io').listen(server);
var path = require('path');
var util = require('util');
var Game = require("./Game").Game;


//Loading the index.html file displayed on the client.

app.get('/', function(req,res){
        res.sendFile(path.join(__dirname, './index.html'));
});

var users = [];
var usernames = [];


io.sockets.on('connection',function(socket){
	console.log(socket.handshake.query.username);
	console.log('A client is connected');

	var user = new Object;
	if(socket.handshake.query.username){
		user["username"] = socket.handshake.query.username;
		user["socketId"] = socket.id;
		users.push(user);
		console.log("users are " + users);
		for(var user of users){
			console.log("user is " + util.inspect(user, false, null));
		}
	}

	//socket.broadcast.emit('message','Another client has just joined');

	// socket.on('name',function(name){
	// 	console.log('client says its name is: ' + name);
	// 	socket.name = name;
	// 	socket.emit('message','You are connected ' + name);
	// });
	socket.on('optionSelection',function(choice,fn){
		var newGame = new Game(choice,"", function(result) {
 		// return value is here
   			fn(result);
		});
	 });

	socket.on('disconnect',function(){
		console.log(socket.handshake.query.username + "user disconnected")
		var index = usernames.indexOf(socket.handshake.query.username);
		usernames.splice(index,1);
		console.log("users left " + usernames);
		for(var i=0;i<users.length;i++){
			if(users[i].username == socket.handshake.query.username){
				users.splice(i,1);

			}
		}
		for(var user of users){
			console.log("user is " + util.inspect(user, false, null));
		}
	});
	
	
	//socket.emit('message','hello!');

});

var port = process.env.PORT || 8100; 
server.listen(port);
console.log("Connection established on port" + port);


