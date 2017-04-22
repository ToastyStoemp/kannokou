/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

comCore = {
	roomConnections: [],
	ignoredUsers: [],

	init: function(){
		// placeholder //
	},

	// initial sign in //
	[protocol.INIT]: function(socket, data){
		socket.nickname = data.nick;

		var reply = { 'c': [protocol.NEWID], 'id': socket.upgradeReq.headers['sec-websocket-key'] };
		//wsServer.sendTo(socket, reply);
		wsServer.buffer(reply, socket.upgradeReq.headers['sec-websocket-key']);
		console.log('New client joined');
	},

	// channel meta requested //
	[protocol.CHANMETA]: function(socket, data){
		var reply = channels.getChannelMeta(data.chan);
		reply.c = protocol.CHANMETA;
		wsServer.buffer(reply, socket.upgradeReq.headers['sec-websocket-key']);
		//wsServer.sendTo(socket, reply);
		console.log('Client requested channel meta data');
	},

	// channel enviroment requested //
	[protocol.CHANENV]: function(socket, data){
		channels.getChannelEnv(data.chan).forEach(function(data){
			data.c = protocol.CHANENV;
			wsServer.buffer(data, socket.upgradeReq.headers['sec-websocket-key']);
		});

		console.log('Sending client channel data');
	},

	// user joins new channel //
	[protocol.JOIN]: function(socket, data){
		if(typeof socket.channel !== 'undefined') console.log('socket.channel ' + socket.channel);
		socket.channel = data.chan;

		// add new user & tell other users about new user //
		var userPacket = channels.addUser(socket.upgradeReq.headers['sec-websocket-key'], socket.nickname, data.chan);
		userPacket.c = protocol.NEWUSER;

		channels.getChannelUsers(data.chan).forEach(function(user){
			if(user.id != userPacket.id)
				wsServer.buffer(userPacket, user.id);
		});

		// inform new user of successfull login & their nickname //
		wsServer.buffer({
			c: protocol.JOIN,
			nick: socket.nickname
		}, socket.upgradeReq.headers['sec-websocket-key']);

		console.log('Client "' + socket.nickname + '" joined channel: ' + data.chan);
	},

	// user udpates channel //
	[protocol.USERUPDATE]: function(socket, data){
		if(channels.updateUser(socket.channel,
													 socket.upgradeReq.headers['sec-websocket-key'],
												 	 data.o) == false) return;

		if(channels.channelIsEmpty(socket.channel)) return;

		// inform other channel users of update //
		var userPacket = { id: socket.upgradeReq.headers['sec-websocket-key'],
											 o: data.o
										 };
		userPacket.c = protocol.USERUPDATE;

		channels.getChannelUsers(socket.channel).forEach(function(user){
			if(user.id != userPacket.id)
				wsServer.buffer(userPacket, user.id);
		});
	},

	userLeft: function(channel, id){
		channels.getChannelUsers(channel).forEach(function(user){
			if(user.id != id)
				wsServer.buffer({
					c: protocol.USERLEFT,
					id: id
				}, user.id);
		});
	},

	//  //
	l: function(socket, data){
		console.log('got ? request');
	},

	// ping //
	[protocol.PING]: function(socket, data){
		console.log('got ping');
	},

	temp: function(){

	}
}
