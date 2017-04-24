/*
  Developer: Toastystoemp, Marzavec
  Description: wrapper for websocket connection
*/

'use strict'

import Protocol from './protocol'
const protocol = Object.freeze(new Protocol())

class Websocket {
  constructor (config) {
    if (typeof this.protocolBound === 'undefined') {
      this.bindProtocol()
      this.protocolBound = true
    }

    if (typeof this.rejoinInterval === 'undefined') this.rejoinInterval = null

    if (typeof this.firstConnection === 'undefined') this.firstConnection = true
    this.myConnectionID = null
    this.currentChannel = 'lobby'
    this.wsPath = typeof config !== 'undefined' ? config.wsPath : this.wsPath

    this.socket = new WebSocket(this.wsPath)
    this.socket.parent = this
    this.socket.onopen = function () { this.parent.connected() }
    this.socket.onclose = function () { this.parent.closed() }
    this.socket.onmessage = function (data) { this.parent.hasData(data) }
  }

  connected () {
    if (this.rejoinInterval !== null) {
      clearInterval(this.rejoinInterval)
      this.rejoinInterval = null
    }

    // to-do: update to use local storage engine //
    this.send({ c: protocol.INIT, nick: 'testUser', pass: 'test' })

    this.heartBeat = setInterval(function () {
      this.sendPing()
    }.bind(this), 40 * 1000)
  }

  sendPing () {
    this.send({ c: protocol.PING })
  }

  closed () {
    this.emitEvent('wsClose', {})

    this.rejoinInterval = setInterval(function () {
      this.constructor()
    }.bind(this), 10 * 1000)
  }

  hasData (data) {
    data = JSON.parse(data.data)

    // parse commands //
    if (typeof this[data.c] === 'function') this[data.c](data)

    // parse events //
    if (typeof data.e !== 'undefined') this.emitEvent(data[protocol.EVENTTYPE], data)
  }

  bindProtocol () {
    // recived new connection id //
    this[protocol.NEWID] = function (data) {
      this.emitEvent(protocol.CHANENV, data)

      this.myConnectionID = data.id

      this.emitEvent('wsConnect', { first: this.firstConnection })

      if (this.firstConnection) this.firstConnection = false
    }

    this[protocol.JOIN] = function (data) {
      console.log('joined channel: ' + data.chan + ', nicknamed: ' + data.nick)
    }
  }

  joinChannel (newChan) {
    this.send({ c: protocol.JOIN, chan: newChan })
  }

  leaveChannel (targetChan) {
    this.send({ c: protocol.LEAVE, chan: targetChan })
  }

  send (data) {
    if (this.socket && this.socket.readyState === this.socket.OPEN) {
      this.socket.send(JSON.stringify(data))
    }
  }

  emitEvent (eType, eData) {
    var fwEvent = new global.Event(eType)
    fwEvent.eventData = eData
    document.dispatchEvent(fwEvent)
  }
}

export default Websocket
