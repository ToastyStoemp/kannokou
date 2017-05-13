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

    this.emitEvent('wsConnect', { first: this.firstConnection })

    this.heartBeat = setInterval(function () {
      this.sendPing()
    }.bind(this), 40 * 1000)
  }

  sendPing () {
    this.send({ c: protocol.PING })
  }

  closed () {
    this.emitEvent('wsClose', {})

    if (this.rejoinInterval === null) {
      this.rejoinInterval = setInterval(function () {
        this.constructor()
      }.bind(this), 10 * 1000)
    }
  }

  hasData (data) {
    data = JSON.parse(data.data)

    // parse commands //
    if (typeof this[data.c] === 'function') this[data.c](data)

    // parse events //
    if (typeof data.e !== 'undefined') this.emitEvent('wsEvent', data)
  }

  bindProtocol () {
    // recived new connection id //
    this[protocol.NEWID] = function (data) {
      if (data.id === false) {
        this.emitEvent('wsAuth', { failed: true })
        return
      }

      this.myConnectionID = data.id

      var evtData = {}
      evtData.nick = data.nick
      evtData.first = this.firstConnection

      this.emitEvent('wsAuth', evtData)

      if (this.firstConnection) this.firstConnection = false
    }

    this[protocol.LASTSESSION] = function (data) {
      this.emitEvent('restoreSession', data)
    }

    this[protocol.JOIN] = function (data) {

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

  tryAuth (username, password) {
    this.send({ c: protocol.INIT, nick: username, pass: password })
  }

  requestApp (appData, id) {
    var request = {
      c: protocol.APPLICATION,
      name: appData.appName,
      appEID: id,
      appData: { act: 'i' }
    }
    if (typeof appData.args !== 'undefined') request.appData = appData.args

    this.send(request)
  }

  restoreLastSession () {
    this.send({ c: protocol.LASTSESSION })
  }

  routeAppData (appData) {
    var request = {
      c: protocol.APPLICATION,
      name: appData.appName,
      appEID: appData.id,
      appData: { act: 'null' }
    }
    if (typeof appData.args !== 'undefined') request.appData = appData.args

    this.send(request)
  }

  emitEvent (eType, eData) {
    var fwEvent = new global.Event(eType)
    fwEvent.eventData = eData
    document.dispatchEvent(fwEvent)
  }
}

export default Websocket
