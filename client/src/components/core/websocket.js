/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

import protocol from './protocol'

var websocket = {
  init: function (config) {
    if (typeof this.rejoinInterval === 'undefined') this.rejoinInterval = null

    this.firstConnection = true
    this.myConnectionID = null
    this.currentChannel = 'lobby'
    this.wsPath = typeof config !== 'undefined' ? config.wsPath : this.wsPath

    this.socket = new WebSocket(this.wsPath)
    this.socket.parent = this
    this.socket.onopen = function () { this.parent.connected() }
    this.socket.onclose = function () { this.parent.closed() }
    this.socket.onmessage = function (data) { this.parent.hasData(data) }
  },

  connected: function () {
    if (this.rejoinInterval !== null) {
      clearInterval(this.rejoinInterval)
      this.rejoinInterval = null
    }

    this.emitEvent('wsConnect', { first: this.firstConnection })

    if (this.firstConnection) {
      this.firstConnection = false
    }

    // to-do: update to use local storage engine //
    this.send({c: protocol.INIT, nick: 'testUser', pass: 'test'})

    this.heartBeat = setInterval(function () {
      this.sendPing()
    }.bind(this), 40 * 1000)
  },

  sendPing: function () {
    this.send({ c: protocol.PING })
  },

  closed: function () {
    this.emitEvent('wsClose', {})

    this.rejoinInterval = setInterval(function () {
      this.init()
    }.bind(this), 10 * 1000)
  },

  hasData: function (data) {
    // parse commands //
    if (typeof this[data.c] === 'function') this[data.c](data)

    // parse events //
    if (typeof data.e !== 'undefined') this.emitEvent(data[protocol.EVENTTYPE], data)
  },

  // recived new connection id //
  [protocol.NEWID]: function (data) {
    this.emitEvent(protocol.CHANENV, data)

    this.myConnectionID = data.id
    if (this.firstConnection) this.joinNewChannel(this.currentChannel)
  },

  send: function (data) {
    if (this.socket && this.socket.readyState === this.socket.OPEN) {
      this.socket.send(JSON.stringify(data))
    }
  },

  emitEvent: function (eType, eData) {
    var fwEvent = new global.Event(eType)
    fwEvent.eventData = eData
    document.dispatchEvent(fwEvent)
  },

  temp: function () { }
}

export default websocket
