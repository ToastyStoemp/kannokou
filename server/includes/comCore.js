/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

comCore = {
	blackListedFunctions: {},
	roomConnections: [],
	ignoredUsers: [],

	init: function () {
		// placeholder //
	},

	// initial sign in //
	[protocol.INIT]: function (socket, data) {
		db.tryLogin(socket, data.nick, data.pass, function (socket, newNick) {
			comCore.authReply(socket, newNick);
		});
	},

	authReply: function (socket, newNick) {
		socket.isAuthed = !(newNick === null);

		if (socket.isAuthed === false) {
			var reply = { 'c': protocol.NEWID, 'id': false };
			wsServer.buffer(reply, socket.upgradeReq.headers['sec-websocket-key']);

			return;
		}

		socket.nickname = newNick;

		var reply = { 'c': protocol.NEWID, 'id': socket.upgradeReq.headers['sec-websocket-key'], nick: newNick };
		wsServer.buffer(reply, socket.upgradeReq.headers['sec-websocket-key']);
	},

	// check for previous session info, otherwise send server list app //
	[protocol.LASTSESSION]: function (socket, data) {
		// to-do: transmit last session (last active channels / apps) from db to client for restore
		var reply = { 'c': protocol.LASTSESSION, 'sess': [{ appName: 'Channel-List' }] };
		wsServer.buffer(reply, socket.upgradeReq.headers['sec-websocket-key']);
	},

	[protocol.APPLICATION]: function (socket, data) {
		if (typeof data.name === 'undefined')
			return;

		data.name = data.name.replace(/^([A-Z])|[\s-_](\w)/g, function(match, p1, p2, offset) {
			if (p2) return p2.toUpperCase();
			return p1.toLowerCase();
		});

		if (typeof this.blackListedFunctions[data.name] !== 'undefined')
			return;

		if (typeof modules.application[data.name] === 'undefined')
			return;

		data.appData.nickname = socket.nickname;
		modules.application[data.name](data.appData, data.appEID, socket);
	},

	// channel meta requested //
	[protocol.CHANMETA]: function (socket, data) {
		var reply = channels.getChannelMeta(data.chan);
		reply.c = protocol.CHANMETA;
		wsServer.buffer(reply, socket.upgradeReq.headers['sec-websocket-key']);
	},

	// channel enviroment requested //
	[protocol.CHANENV]: function (socket, data) {
		channels.getChannelEnv(data.chan).forEach(function (data) {
			data.c = protocol.CHANENV;
			wsServer.buffer(data, socket.upgradeReq.headers['sec-websocket-key']);
		});
	},

	// user joins new channel //
	[protocol.JOIN]: function (socket, data) {
		if (typeof data.chan === 'undefined') return;

		socket.channel = data.chan;

		// add new user & tell other users about new user //
		var userPacket = channels.addUser(socket.upgradeReq.headers['sec-websocket-key'], socket.nickname, data.chan);
		userPacket.c = protocol.NEWUSER;

		channels.getChannelUsers(data.chan).forEach(function (user) {
			if (user.id != userPacket.id)
				wsServer.buffer(userPacket, user.id);
		});

		// inform new user of successfull login & their nickname //
		wsServer.buffer({
			c: protocol.JOIN,
			nick: socket.nickname,
			chan: data.chan
		}, socket.upgradeReq.headers['sec-websocket-key']);
	},

	// user updates channel //
	[protocol.USERUPDATE]: function (socket, data) {
		if (channels.updateUser(socket.channel,
													 socket.upgradeReq.headers['sec-websocket-key'],
												 	 data.o) == false) return;

		if (channels.channelIsEmpty(socket.channel)) return;

		// inform other channel users of update //
		var userPacket = { id: socket.upgradeReq.headers['sec-websocket-key'],
											 o: data.o
										 };
		userPacket.c = protocol.USERUPDATE;

		channels.getChannelUsers(socket.channel).forEach(function (user) {
			if (user.id != userPacket.id)
				wsServer.buffer(userPacket, user.id);
		});
	},

	userLeft: function (channel, id) {

	},

	//  //
	l: function (socket, data) {

	},

	// ping //
	[protocol.PING]: function (socket, data) {

	},

	temp: function () {	}
}
