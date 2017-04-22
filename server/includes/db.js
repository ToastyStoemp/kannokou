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



	temp: function(){

	}
}
