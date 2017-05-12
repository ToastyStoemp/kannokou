/*
  Developer: Toastystoemp, Marzavec
  Description: module template. Naming: camelCase
*/

/*modules.protocol[''] = function (data) {
	return data;
}*/

modules.application['placeHolder'] = function () {
  var reply = channels.getChannelMeta(data.chan);
  reply.c = protocol.CHANMETA;
  wsServer.buffer(reply, socket.upgradeReq.headers['sec-websocket-key']);
}
