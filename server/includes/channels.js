/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

channels = {
	data: {},

	init: function () {
		// load default channels //
    this.buildChannel('lobby', 'system', false, 'clouds', 'Just another channel I guess');
    this.buildChannel('programming', 'system', false, 'clouds', 'Bet this is the main channel');

		// load user created channels //
		// to-do //
		this.buildChannel('furries unite', 'sumfgt', false, 'clouds', 'Nope, I lied- main channel right here');
	},

	buildChannel: function (channel, owner, priv, icon, desc) {
		this.data[channel] = {};
		this.data[channel].owner = owner;
		this.data[channel].private = priv;
		this.data[channel].icon = icon;
		this.data[channel].desc = desc;
		this.data[channel].userCount = 0;
    this.data[channel].users = [];
		this.data[channel].objCount = 0;
    this.data[channel].objs = [];
	},

	getChannelOverview: function (curPage, count) {
		var metaData = [];

		Object.keys(this.data).forEach(function (channel) {
			if (this.data[channel].private === false)
				metaData.push({
					name: channel,
					icon: this.data[channel].icon,
					users: this.data[channel].userCount,
					desc: this.data[channel].desc
				});
		}.bind(this));

		// to-do: add sorting by user count here //

		if (metaData.length > count)
			metaData = metaData.splice((curPage * count), count);

		return metaData;
	},

	getChannelMeta: function (channel) {
		if (typeof this.data[channel] === 'undefined') return false;

		return {
			'owner': this.data[channel].owner,
			'uCnt': this.data[channel].userCount,
			'oCnt': this.data[channel].objCount
		};
	},

	getChannelEnv: function (channel) {
		if (typeof this.data[channel] === 'undefined') return false;

		return this.data[channel].objs.concat(this.data[channel].users);
	},

	addObject:function (channel, objInfo) {
		if (typeof this.data[channel] === 'undefined') return false;

		this.data[channel].objCount++;
		var slot = this.data[channel].objs.push(objInfo) - 1;
		this.data[channel].objs[slot].id = this.genId(7);
	},

	addUser: function (id, appEID, nick, channel) {
		if (typeof this.data[channel] === 'undefined') return false;

		this.data[channel].userCount++;

		var newUser = {
			id: id,
			appEID: appEID,
			nick: nick,
			peer: true,
			avtr: "https://avatars0.githubusercontent.com/u/17520604?v=3&s=460#lazy" // to-do: make live avatars
		};

		this.data[channel].users.push(Object.assign({}, newUser));
		return newUser;
	},

	removeUser: function (channel, id) {
		if (typeof this.data[channel] === 'undefined') return;

		var nick = 'newb';
		for(var i = 0; i < this.data[channel].userCount; i++) {
			if (this.data[channel].users[i].id === id) {
				nick = this.data[channel].users[i].nick;
				this.data[channel].users.splice(i, 1);
				this.data[channel].userCount--;
				i--;
			}
		}

		this.getChannelUsers(channel).forEach(function (user) {
			if (user.id != id)
				wsServer.buffer({
					e: protocol.APPLICATION,
					appEID: user.appEID,
					eType: 'l', // user left //
					ad: {
						nick: nick,
						id: id
					}
				}, user.id);
		});
	},

	updateUser: function (channel, id, userOpts) {
		if (typeof this.data[channel] === 'undefined') return false;

		for(var i = 0; i < this.data[channel].userCount; i++) {
			if (this.data[channel].users[i].id == id) {

			}
		}

		return false;
	},

	getChannelUsers: function (channel) {
		if (typeof this.data[channel] === 'undefined') return [];
		return this.data[channel].users;
	},

	updateObject:function (channel, objId, objInfo) {

	},

	removeObject: function (channel, objId) {
		if (typeof this.data[channel] === 'undefined') return;

		for(var i = 0; i < this.data[channel].userCount; i++) {
			if (this.data[channel].users[i].id == id) {
				this.data[channel].users.splice(i, 1);
				this.data[channel].userCount--;
			}
		}
	},

	channelIsEmpty: function (channel) {
		if (typeof this.data[channel] === 'undefined') return true;
		if (this.data[channel].userCount <= 1) return true;

		return false;
	},

	hasUser: function (channel, id) {
		if (typeof this.data[channel] === 'undefined') return false;
		for(var i = 0; i < this.data[channel].userCount; i++)
			if (this.data[channel].users[i].id == id)
				return true;

		return false;
	},

	genId: function (len) {
		var strPool = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var ret = '';

		for(var i = 0; i < len; i++)
			ret += strPool.charAt(Math.floor(Math.random() * strPool.length));

		return ret;
	},

	temp: function () {

	}
}
