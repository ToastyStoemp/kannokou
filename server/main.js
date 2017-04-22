/*
  Developer: Toastystoemp, Marzavec
  Description: imports and initializes framework
*/

// import node modules //
fileSys = require('fs');
mysql = require('mysql');
webSocket = require('ws');

// main import function //
// blocking function used to make sure everything is imported before init()s //
var importDirectory = function(targetDir){
  var fileList = fileSys.readdirSync(targetDir);
  fileList.forEach(function(targetFile){
    if(targetFile.substr(-3) == '.js'){
      targetFile = targetDir + targetFile;
      if(!fileSys.lstatSync(targetFile).isDirectory()) require(targetFile);
    }
  });
}

// create log folder //
if(!fileSys.existsSync('./logs')){
  fileSys.mkdirSync('./logs');
}

// import server configs //
importDirectory('./configs/');

// import server classes //
importDirectory('./includes/');

// import server modules //
importDirectory('./modules/');

// initialize //
db.init();
channels.init();
wsServer.init();

console.log('Ready.');
