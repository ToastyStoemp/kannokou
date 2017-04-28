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
// main class
class UiEngine {
  constructor () {
    this.coreContainer = new CoreContainer()

    this.mainNav = new MainNav()
    this.mainMenuBtn = new MainMenuButton()
    this.bindEvents()

    this.addDom(this.coreContainer.build())
    this.addDom(this.mainNav.build())
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
  }

  unbindEvents () {

  }

  startLogin () {
    this.loginContainer.hide()
    
    this.mainNav.show()
    this.mainMenuBtn.show()
    console.log('attempting login')
  }

  getTable () {
    var rTable = new TableContainer()

    return rTable
  }
}

export default UiEngine
