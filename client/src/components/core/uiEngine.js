/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

'use strict'

// import Protocol from './protocol'
// const protocol = Object.freeze(new Protocol())

import TableContainer from '../views/tableContainer'
// main class
class UiEngine {
  constructor () {
    this.bindEvents()
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
