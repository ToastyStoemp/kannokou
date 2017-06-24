/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

/*modules.protocol[''] = function (data) {
	return data;
}*/

modules.application['chat'] = function (appData, eventID, socket) {
  if (typeof appData.act === 'undefined') return;
  if (typeof appData.chan === 'undefined') return;

  var haltDirectResponse = false;
  var userId = socket.upgradeReq.headers['sec-websocket-key'];
  var userName = socket.nickname;

  var reply = {
    e: protocol.APPLICATION,
    appEID: eventID
  };

  var countPerPage = 10;
  var curPage = typeof appData.p === 'undefined' ? 1 : parseInt(appData.p)

  switch (appData.act) {
    case 'i' : // initialize
      reply.ui = 'ChannelChat';

      var allowJoin = true;

      // check for existing connection id
      var chanUsers = channels.getChannelUsers(appData.chan);
      chanUsers.forEach(function (user){
        if (user.id === userId) {
          allowJoin = false;
          reply.ad = {
      			err: 'You are already there'
      		}
        }
      })

      // check for existing name
      if (allowJoin) {
        chanUsers.forEach(function (user){
          if (user.nick === userName) {
            allowJoin = false;
            reply.ad = {
        			err: 'Name taken! D:'
        		}
            reply.eType = 'err';
          }
        })
      }

      if (allowJoin) {
        // add new user to channel & tell other users about new user //
    		var userPacket = channels.addUser(
          userId,
          eventID,
          userName,
          appData.chan
        );

        if (userPacket === false){
          reply.ad = {
      			err: 'Unknown error - Failed to join channel'
      		}
          reply.eType = 'err';
        }else{
          // push new channel to tracking //
          socket.channels.push(appData.chan);

          // inform channel group of new connection //
      		userPacket.e = protocol.APPLICATION;
      		userPacket.eType = 'j';
          var channelUsers = [];
      		channels.getChannelUsers(appData.chan).forEach(function (user) {
      			if (user.id != userPacket.id) {
              userPacket.appEID = user.appEID;
              wsServer.buffer(userPacket, user.id);
              channelUsers.push({ nick: user.nick, peer: user.peer, avtr: user.avtr });
            }
      		});

          reply.ad = {
      			nick: userName,
      			chan: appData.chan,
            peers: channelUsers
      		}
        }
      }
    break;
    case 'msg' :
      // check if this socket id is in channel
      if (socket.channels.indexOf(appData.chan) === -1) return;

      reply.eType = 'm';
      reply.ad = {
  			nick: userName,
        msg: appData.msg
  		}

      channels.getChannelUsers(appData.chan).forEach(function (user) {
        reply.appEID = user.appEID;
  			wsServer.buffer(reply, user.id);
      });

      haltDirectResponse = true;
    break;
    case 'close' :
      channels.removeUser(appData.chan, userId);
    break;
  }

  if (haltDirectResponse === false)
    wsServer.buffer(reply, userId);
}
