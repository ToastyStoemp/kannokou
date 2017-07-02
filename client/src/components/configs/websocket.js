/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

class WsConfig {
  constructor () {
    // this.port = 7676

    this.wsPath = this.pathByDomain(window.location.hostname)
  }

  pathByDomain (domain) {
    return 'wss://' + domain + '/chat-ws'

    // return 'ws://' + domain + ':' + this.port
  }
}

export default WsConfig
