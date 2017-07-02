/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

wsServer = {
	serverSocket: 0,
	blackListedFunctions: {},

	broadcastBuffer: [],
	bBufferInterval: null,
	bBufferMS: 3, //250

	sendtoBuffer: [],
	sBufferInterval: null,
	sBufferMS: 2, // 75,

	init: function () {
		// setup functions that cannot be called //
		this.blackListedFunctions.init = function () {};
		this.blackListedFunctions.userLeft = function () {};

		this.serverSocket = new webSocket.Server({port: mainConfig.wsPort});

		this.serverSocket.on('connection', this.newConnection);

		this.bBufferInterval = setInterval(function () {
			if (wsServer.broadcastBuffer.length > 0)
				wsServer.broadCast(wsServer.broadcastBuffer.shift()); // to-do: this should be channel based
		}, this.bBufferMS);

		this.sBufferInterval = setInterval(function () {
			if (wsServer.sendtoBuffer.length > 0) {
				var data = wsServer.sendtoBuffer.shift();
				wsServer.sendTo(wsServer.getSocketById(data.targetId), data);
			}
		}, this.sBufferMS);
	},

	newConnection: function (socket) {
		// setup error handling
		socket._receiver.onerror = function(e){
			socket._receiver.flush();
			socket._receiver.messageBuffer = [];
			socket._receiver.cleanup();
			socket.close();
		}

		// initialize socket data
		socket.channels = [];

		socket.on('message', function (data) { wsServer.receivedData(socket, data); });
		socket.on('close', function (data) { wsServer.socketClosed(socket); });
	},

	receivedData: function (socket, data) {
		// to-do: flood protection here //

		var cmdData = null;

    try{
      cmdData = JSON.parse(data);
    }catch(err) {
      sysLog.add('WebSocket', 'Client sent malformed json: ' + err);
			socket.close();
			return;
    }

		if (typeof this.blackListedFunctions[cmdData.c] !== 'undefined' || typeof this.blackListedFunctions[cmdData.e] !== 'undefined') {
			sysLog.add('Security', 'Blacklist Function Attempt: ' + socket.upgradeReq.connection.remoteAddress);
			socket.close();
			return;
		}

		if ((typeof socket.isAuthed === 'undefined' || socket.isAuthed === false) && cmdData.c !== protocol.INIT) return;

		if (typeof comCore[cmdData.c] == 'function') comCore[cmdData.c](socket, cmdData);
		if (typeof comCore[cmdData.e] == 'function') comCore[cmdData.e](socket, cmdData);
	},

	broadCast: function (data) {
		for(var client of this.serverSocket.clients) this.sendTo(client, data); // to-do: this should be channel based
	},

	sendTo: function (socket, data) {
		if (typeof socket === 'undefined') return; // zombie killer needed

		if (socket.readyState == webSocket.OPEN)
			socket.send(JSON.stringify(data), function (err) {
				if (typeof err !== 'undefined') console.log('Ws failed to send to target: ' + err)
			});
	},

	getSocketById: function (targetId) {
		for(var client of this.serverSocket.clients)
			if (client.upgradeReq.headers['sec-websocket-key'] == targetId)
				return client;
	},

	buffer: function (data, targetId) {
		if (typeof targetId === 'undefined') {
			this.broadcastBuffer.push(data);
		}else{
			data.targetId = targetId;
			this.sendtoBuffer.push(Object.assign({}, data));
		}
	},

	socketClosed: function (socket) {
		if (socket.channels.length === 0) return;

		var id = socket.upgradeReq.headers['sec-websocket-key'];
		socket.channels.forEach( function (chan){
			channels.removeUser(chan, id);
			comCore.userLeft(chan, id);
		});
	}
}
