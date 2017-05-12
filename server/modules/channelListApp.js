/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

/*modules.protocol[''] = function (data) {
	return data;
}*/

modules.application['channelList'] = function (appData, eventID, socket) {
  if (typeof appData.act === 'undefined') return;

  var reply = {
    e: protocol.APPLICATION,
    appEID: eventID
  };

  var countPerPage = 10;
  var curPage = typeof appData.p === 'undefined' ? 1 : parseInt(appData.p)

  switch (appData.act) {
    case 'i' : // initialize, reply with initial data
      reply.ui = 'ChannelList';
      var chanOverview = channels.getChannelOverview(curPage, countPerPage);
      var appdata = [];
      chanOverview.forEach(function (chanData) {
        appdata.push({
          icon: chanData.icon,
          title: chanData.name,
          data: chanData.desc
        })
      }.bind(this));
      reply.ad = appdata;
    break;
  }

  wsServer.buffer(reply, socket.upgradeReq.headers['sec-websocket-key']);
}
