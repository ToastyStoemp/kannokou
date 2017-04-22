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

	init: function(){
		// setup functions that cannot be called //
		this.blackListedFunctions.init = function(){};
		this.blackListedFunctions.userLeft = function(){};

		this.serverSocket = new webSocket.Server({port: mainConfig.wsPort});

		this.serverSocket.on('connection', this.newConnection);

		this.bBufferInterval = setInterval(function(){
			if(wsServer.broadcastBuffer.length > 0)
				wsServer.broadCast(wsServer.broadcastBuffer.shift());
		}, this.bBufferMS);

		this.sBufferInterval = setInterval(function(){
			if(wsServer.sendtoBuffer.length > 0){
				var data = wsServer.sendtoBuffer.shift();
				wsServer.sendTo(wsServer.getSocketById(data.targetId), data);
			}
		}, this.sBufferMS);
	},

	newConnection: function(socket){
		console.log('new connection')
		socket.on('message', function(data){ wsServer.receivedData(socket, data); });
		socket.on('close', function(data){ wsServer.socketClosed(socket); });
	},

	receivedData: function(socket, data){
		var cmdData = null;

    try{
      cmdData = JSON.parse(data);
    }catch(err){
      sysLog.add('WebSocket', 'Client sent malformed json: ' + err);
			socket.close();
			return;
    }

		if(typeof this.blackListedFunctions[cmdData.c] !== 'undefined' || typeof this.blackListedFunctions[cmdData.e] !== 'undefined'){
			sysLog.add('WebSocket', 'Client sent malformed json: ' + err);
			socket.close();
			return;
		}

		if(typeof comCore[cmdData.c] == 'function') comCore[cmdData.c](socket, cmdData);
		if(typeof comCore[cmdData.e] == 'function') comCore[cmdData.e](socket, cmdData);
	},

	broadCast: function(data){
		for(var client of this.serverSocket.clients) this.sendTo(client, data);
	},

	sendTo: function(socket, data){
		if(socket.readyState == webSocket.OPEN) socket.send(JSON.stringify(data));
	},

	getSocketById: function(targetId){
		for(var client of this.serverSocket.clients)
			if(client.upgradeReq.headers['sec-websocket-key'] == targetId)
				return client;
	},

	buffer: function(data, targetId){
		if(typeof targetId === 'undefined'){
			this.broadcastBuffer.push(data);
		}else{
			data.targetId = targetId;
			this.sendtoBuffer.push(data);
		}
	},

	socketClosed: function(socket){
		channels.removeUser(socket.channel, socket.upgradeReq.headers['sec-websocket-key']);
		comCore.userLeft(socket.channel, socket.upgradeReq.headers['sec-websocket-key']);
	}
}
