/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

// import protocol from './protocol'

var core = {
  init: function () {
    this.bindEvents()
  },

  bindEvents: function () {
    document.addEventListener('wsConnect', this.onWsConnect)
    document.addEventListener('wsClose', this.onWsClose)
  },

  unbindEvents: function () {
    document.removeEventListener('wsConnect', this.onWsConnect)
    document.removeEventListener('wsClose', this.onWsClose)
  },

  onWsConnect: function () {
    console.log('main ws connected')
  },

  onWsClose: function () {
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
