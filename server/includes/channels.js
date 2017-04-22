/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

channels = {
	data: {},

	init: function(){
		// load default channels //
    this.buildChannel('lobby', 'system');

		// load user created channels //
		// to do //
	},

	buildChannel: function(channel, owner, width, height){
		this.data[channel] = {};
		this.data[channel].owner = owner;
		this.data[channel].userCount = 0;
    this.data[channel].users = [];
		this.data[channel].objCount = 0;
    this.data[channel].objs = [];
	},

	getChannelMeta: function(channel){
		if(typeof this.data[channel] === 'undefined') return false;

		return {
			'owner': this.data[channel].owner,
			'w': this.data[channel].width,
			'h': this.data[channel].height,
			'uCnt': this.data[channel].userCount,
			'oCnt': this.data[channel].objCount
		};
	},

	getChannelEnv: function(channel){
		if(typeof this.data[channel] === 'undefined') return false;

		return this.data[channel].objs.concat(this.data[channel].users);
	},

	addObject:function(channel, objInfo){
		if(typeof this.data[channel] === 'undefined') return false;

		this.data[channel].objCount++;
		var slot = this.data[channel].objs.push(objInfo) - 1;
		this.data[channel].objs[slot].id = this.genId(7);
	},

	addUser: function(id, nick, channel){
		if(typeof this.data[channel] === 'undefined') return false;

		this.data[channel].userCount++;

		var newUser = {
			id: id,
			nick: nick,
			peer: true,
			avtr: "avatar url goes here"
		};

		this.data[channel].users.push(newUser);
		return newUser;
	},

	removeUser: function(channel, id){
		if(typeof this.data[channel] === 'undefined') return;

		for(var i = 0; i < this.data[channel].userCount; i++){
			if(this.data[channel].users[i].id == id){
				this.data[channel].users.splice(i, 1);
				this.data[channel].userCount--;
			}
		}
	},

	updateUser: function(channel, id, userOpts){
		if(typeof this.data[channel] === 'undefined') return false;

		for(var i = 0; i < this.data[channel].userCount; i++){
			if(this.data[channel].users[i].id == id){

			}
		}

		return false;
	},

	getChannelUsers: function(channel){
		if(typeof this.data[channel] === 'undefined') return [];
		return this.data[channel].users;
	},

	updateObject:function(channel, objId, objInfo){

	},

	removeObject: function(channel, objId){
		if(typeof this.data[channel] === 'undefined') return;

		for(var i = 0; i < this.data[channel].userCount; i++){
			if(this.data[channel].users[i].id == id){
				this.data[channel].users.splice(i, 1);
				this.data[channel].userCount--;
			}
		}
	},

	channelIsEmpty: function(channel){
		if(typeof this.data[channel] === 'undefined') return true;
		if(this.data[channel].userCount <= 1) return true;

		return false;
	},

	genId: function(len){
		var strPool = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var ret = '';

		for(var i = 0; i < len; i++)
			ret += strPool.charAt(Math.floor(Math.random() * strPool.length));

		return ret;
	},

	temp: function(){

	}
}
