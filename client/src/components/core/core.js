/*
  Developer: Toastystoemp, Marzavec
  Description: core singleton, binds the uiEngine to websocket events or data
*/

'use strict'

import StorageEngine from './storageEngine'
const storageEngine = Object.freeze(new StorageEngine())

import UiEngine from './uiEngine'

// import Protocol from './protocol'
// const protocol = Object.freeze(new Protocol())

import WsConfig from '../configs/websocket'
const wsConfig = Object.freeze(new WsConfig())

import Websocket from './websocket'

var core = {
  init: function () {
    this.currentChannels = storageEngine.getObj('chanList')
    if (!this.currentChannels) this.currentChannels = ['lobby']

    this.uiEngine = new UiEngine()

    this.websocket = new Websocket(wsConfig)

    this.bindEvents()
  },

  bindEvents: function () {
    document.addEventListener('wsConnect', this.onWsConnectFn = function (e) { this.onWsConnect(e) }.bind(this))
    document.addEventListener('wsClose', this.onWsCloseFn = function (e) { this.onWsClose(e) }.bind(this))
  },

  unbindEvents: function () {
    document.removeEventListener('wsConnect', this.onWsConnectFn)
    document.removeEventListener('wsClose', this.onWsCloseFn)
  },

  onWsConnect: function (evt) {
    if (evt.eventData.first) {
      this.websocket.joinChannel('lobby')
    }

    this.uiEngine.showLogin()
    console.log('main ws connected')
  },

  onWsClose: function (evt) {
    console.log('main ws CLOSED')
  },

  emitEvent: function (eType, eData) {
    var fwEvent = new global.Event(eType)
    fwEvent.eventData = eData
    document.dispatchEvent(fwEvent)
  },

  temp: function () { }
}

export default core
