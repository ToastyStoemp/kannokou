/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

'use strict'

// import Protocol from './protocol'
// const protocol = Object.freeze(new Protocol())

import CoreContainer from '../views/coreContainer'
import LoginContainer from '../views/loginContainer'
import TableContainer from '../views/tableContainer'
import MainMenuButton from '../views/mainMenuButton'
import MainNav from '../views/mainNav'
import LeftNav from '../views/leftNav'
// main class
class UiEngine {
  constructor () {
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
    if (typeof this.loginContainer === 'undefined') this.loginContainer = new LoginContainer()
    this.addDom(this.loginContainer.build())
  }

  bindEvents () {
    document.addEventListener('doLogin', this.startLoginFn = function (e) { this.startLogin(e) }.bind(this))
    document.addEventListener('wsAuth', this.onWsAuthedFn = function (e) { this.onWsAuthed(e) }.bind(this))
  }

  unbindEvents () {

  }

  startLogin () {
    this.loginContainer.hide()
  }

  onWsAuthed (evt) {
    if (typeof evt.eventData.failed !== 'undefined' && evt.eventData.failed === true) {
      // clear password input here #lazy //
      global.Materialize.toast('LOGIN FAILED', 4000, 'orange darken-4')
      this.loginContainer.show()
      return
    }

    this.mainNav.show()
    this.mainNav.changeUsername(evt.eventData.nick)

    this.leftNav.show()
    this.coreContainer.show()
    this.mainMenuBtn.show()
  }

  addNewAppSpace (title, useLoader) {
    return this.coreContainer.addNewAppSpace(title, useLoader)
  }

  getTable () {
    var rTable = new TableContainer()

    return rTable
  }
}

export default UiEngine
