/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

'use strict'

import BaseContainer from '../base/baseContainer'

class LeftNav extends BaseContainer {
  constructor () {
    super()

    this.baseStructure = {
      _class: 'row scale-transition scale-transition hide scale-out',

      ul: {
        _class: 'side-nav fixed grey darken-3 z-depth-0',
        _style: 'height: calc(100vh - 64px);',  // to-do: fix this
        _id: 'leftNav'
      }
    }

    Object.freeze(this.baseStructure)

    this.structure = Object.assign({}, this.baseStructure)
  }

  updateStructure (title, newStruct) {
    document.getElementById('currentChannel').innerHTML = title // to-do: update by reference instead of getElementById

    var rebuilt = JSON.parse(JSON.stringify(this.baseStructure)) // Object.assign() does not work here
    rebuilt.ul = Object.assign(rebuilt.ul, newStruct)
    this.structure = Object.assign({}, rebuilt)

    this.clearDom()
    this.build()
    this.show()

    setTimeout(function () {
      global.$('.collapsible').collapsible()
    }, 1)
  }
}

export default LeftNav
