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
    this.rememberData = false
    if (!this.currentChannels) this.currentChannels = ['lobby']

    this.uiEngine = new UiEngine()

    this.websocket = new Websocket(wsConfig)

    this.bindEvents()
  },

  bindEvents: function () {
    document.addEventListener('wsConnect', this.onWsConnectFn = function (e) { this.onWsConnect(e) }.bind(this))
    document.addEventListener('wsClose', this.onWsCloseFn = function (e) { this.onWsClose(e) }.bind(this))

    document.addEventListener('doLogin', this.startLoginFn = function (e) { this.startLogin(e) }.bind(this))
    document.addEventListener('wsAuth', this.onWsAuthedFn = function (e) { this.onWsAuthed(e) }.bind(this))

    document.addEventListener('restoreSession', this.onSessionInfoFn = function (e) { this.onSessionInfo(e) }.bind(this))
    document.addEventListener('remoteStartApp', this.onRemoteStartFn = function (e) { this.onRemoteStart(e) }.bind(this))

    document.addEventListener('routeAppData', this.routeAppDataFn = function (e) { this.routeAppData(e) }.bind(this))
  },

  unbindEvents: function () {
    document.removeEventListener('wsConnect', this.onWsConnectFn)
    document.removeEventListener('wsClose', this.onWsCloseFn)

    document.removeEventListener('doLogin', this.startLoginFn)
    document.removeEventListener('wsAuth', this.onWsAuthedFn)

    document.removeEventListener('restoreSession', this.onSessionInfoFn)
    document.removeEventListener('remoteStartApp', this.onRemoteStartFn)

    document.removeEventListener('routeAppData', this.routeAppDataFn)
  },

  onWsConnect: function (evt) {
    global.Materialize.toast('Connected!', 4000, 'orange darken-4')
    this.uiEngine.showLogin()
  },

  onWsClose: function (evt) {
    global.Materialize.toast('Lost Server Connection', 4000, 'orange darken-4')
  },

  startLogin: function (evt) {
    this.rememberData = evt.eventData.remember
    this.websocket.tryAuth(evt.eventData.loginUsername, evt.eventData.loginPassword)
  },

  onWsAuthed: function (evt) {
    if (typeof evt.eventData.failed !== 'undefined' && evt.eventData.failed === true) return

    if (evt.eventData.first) {
      this.websocket.restoreLastSession()
    }
  },

  onSessionInfo: function (evt) {
    evt.eventData.sess.forEach(function (appData) {
      this.startApp(appData)
    }.bind(this))
  },

  onRemoteStart: function (evt) {
    this.startApp(evt.eventData, true, true)
  },

  startApp: function (appData, useLoader, switchTo) {
    if (typeof useLoader === 'undefined') useLoader = true
    if (typeof switchTo === 'undefined') switchTo = false

    var appID = this.uiEngine.addNewAppSpace(appData.appName, useLoader, switchTo)
    this.websocket.requestApp(appData, appID)
  },

  routeAppData: function (evt) {
    this.websocket.routeAppData(evt.eventData)
  },

  emitEvent: function (eType, eData) {
    var fwEvent = new global.Event(eType)
    fwEvent.eventData = eData
    document.dispatchEvent(fwEvent)
  },

  temp: function () { }
}

export default core
