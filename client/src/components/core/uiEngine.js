/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

'use strict'

// import Protocol from './protocol'
// const protocol = Object.freeze(new Protocol())

import CoreContainer from '../views/core/coreContainer'
import MainNav from '../views/core/mainNav'
import LeftNav from '../views/core/leftNav'
import MainMenuButton from '../views/core/mainMenuButton'

import LoginContainer from '../views/core/loginContainer'

import PagedTable from '../views/base/pagedTable'
import ChannelList from '../views/apps/channelList'
import ChannelChat from '../views/apps/channelChat'

const subUI = {
  'PagedTable': PagedTable,
  'ChannelList': ChannelList,
  'ChannelChat': ChannelChat
}
// main class
class UiEngine {
  constructor () {
    this.appSpaces = {}

    this.coreContainer = new CoreContainer()
    this.mainNav = new MainNav()
    this.leftNav = new LeftNav()
    this.mainMenuBtn = new MainMenuButton()

    this.bindEvents()

    this.addDom(this.mainNav.build())
    this.addDom(this.leftNav.build())
    this.addDom(this.coreContainer.build())
    this.addDom(this.mainMenuBtn.build())
  }

  addDom (targetDom) {
    document.body.appendChild(targetDom)
  }

  showLogin () {
    if (typeof this.loginContainer === 'undefined') {
      this.loginContainer = new LoginContainer()
      this.addDom(this.loginContainer.build())
    }

    this.loginContainer.show()
  }

  bindEvents () {
    document.addEventListener('doLogin', this.startLoginFn = function (e) { this.startLogin(e) }.bind(this))
    document.addEventListener('wsAuth', this.onWsAuthedFn = function (e) { this.onWsAuthed(e) }.bind(this))
    document.addEventListener('wsEvent', this.onWsEventFn = function (e) { this.onWsEvent(e) }.bind(this))
    document.addEventListener('tabEvent', this.tabEventFn = function (e) { this.onWsEvent(e) }.bind(this)) // bound to wsEvent on purpose
  }

  unbindEvents () {

  }

  startLogin () {
    this.loginContainer.hide()
  }

  onWsAuthed (evt) {
    if (typeof evt.eventData.failed !== 'undefined' && evt.eventData.failed === true) {
      // to-do: clear password input here #lazy //
      global.Materialize.toast('LOGIN FAILED', 4000, 'orange darken-4')
      this.loginContainer.show()
      return
    }

    // to-do: delete login container here //

    this.mainNav.show()
    this.mainNav.changeUsername(evt.eventData.nick)

    this.coreContainer.show()
    this.leftNav.show()
    this.mainMenuBtn.show()
  }

  onWsEvent (evt) {
    if (typeof evt.eventData.appEID === 'undefined') return
    if (typeof this.appSpaces[evt.eventData.appEID].parent === 'undefined') return

    if (typeof this.appSpaces[evt.eventData.appEID].ui === 'undefined') { // app not initialized
      if (typeof evt.eventData.ui === 'undefined') return // bad init packet

      this.appSpaces[evt.eventData.appEID].ui = new subUI[evt.eventData.ui](this.appSpaces[evt.eventData.appEID].parent, evt.eventData.ad)
      this.appSpaces[evt.eventData.appEID].parent.innerHTML = ''
      this.appSpaces[evt.eventData.appEID].parent.appendChild(this.appSpaces[evt.eventData.appEID].ui.build())

      if (typeof this.appSpaces[evt.eventData.appEID].ui.afterBuild === 'function') {
        this.appSpaces[evt.eventData.appEID].ui.afterBuild()
      }
    } else {
      this.appSpaces[evt.eventData.appEID].ui.handle(evt.eventData)
    }
  }

  addNewAppSpace (title, useLoader, switchTo) {
    var spaceData = this.coreContainer.addNewAppSpace(title, useLoader, switchTo)
    this.appSpaces[spaceData.id] = {}
    this.appSpaces[spaceData.id].parent = spaceData.dom
    return spaceData.id
  }

  getTables () {
    var pTable = new PagedTable()
    var cList = new ChannelList()

    return pTable - cList
  }
}

export default UiEngine
