/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

'use strict'

// import Protocol from './protocol'
// const protocol = Object.freeze(new Protocol())

import CoreContainer from '../views/coreContainer'
import TableContainer from '../views/tableContainer'
// main class
class UiEngine {
  constructor () {
    this.coreContainer = new CoreContainer()
    this.bindEvents()

    document.body.appendChild(this.coreContainer.build())
  }

  bindEvents () {
  // document.addEventListener(protocol., this.onWsConnect)
  }

  unbindEvents () {

  }

  getTable () {
    var rTable = new TableContainer()

    return rTable
  }
}

export default UiEngine
