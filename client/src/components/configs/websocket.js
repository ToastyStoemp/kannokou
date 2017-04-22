/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

var wsConfig = {
  init: function (curDomain) {
    this.port = 7676

    this.wsPath = this.pathByDomain(curDomain)
  },

  pathByDomain: function (domain) {
    // return 'wss://' + domain + ':' + this.port

    return 'ws://' + domain + ':' + this.port
  },

  temp: function () {
    console.log(this.test)
  }
}

export default wsConfig
