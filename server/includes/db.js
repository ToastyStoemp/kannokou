/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

db = {
	conn: null,

	init: function(){
		this.conn = mysql.createConnection({
        host     : mainConfig.dbHost,
        user     : mainConfig.dbUser,
        password : mainConfig.dbPass,
        database : mainConfig.mainDb
      });
	},

	tryLogin: function(socket, user, pass, callback){
		callback(socket, user); // to-do //
		// callback(socket, null); // fail test case //
	},

	temp: function(){

	}
}
