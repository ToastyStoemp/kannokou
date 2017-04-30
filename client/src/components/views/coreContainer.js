/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

'use strict'

import BaseContainer from './baseContainer'

class CoreContainer extends BaseContainer {
  constructor () {
    super()

    this.tabCount = 0
    this.coreTabsID = 'coreTabs'

    this.structure = {
      _class: 'row hide',

      div_1: {
        _class: 'col s2'
      },

      div_2: {
        _class: 'col s10',

        ul: {
          _class: 'tabs tabs-fixed-width grey darken-3',
          _id: this.coreTabsID
        }
      }
    }

    this.bindEvents()
  }

  bindEvents () {

  }

  unbindEvents () {

  }

  addNewAppSpace (title, useLoader) {
    if (typeof useLoader === 'undefined') useLoader = true

    var id = 'ct_' + this.tabCount++

    var appSpaceBtn = {
      li: {
        _class: 'tab col s3',

        a: {
          _href: '#' + id,
          _content: title
        }
      }
    }

    var appSpaceContent = {
      _id: id,
      _class: 'grey darken-3 valign-wrapper',
      _style: 'min-height: 70vh', // to-do: fix this
      _child: null
    }

    if (useLoader) appSpaceContent._child = this.getPreloader()

    document.getElementById(this.coreTabsID).appendChild(this.getDomByStruct(appSpaceBtn).firstChild)
    document.getElementById(this.coreTabsID).parentNode.appendChild(this.getDomByStruct(appSpaceContent))

    setTimeout(function () {
      global.$('ul.tabs').tabs().bind(document) // jquery sucks so bad
    }, 1)

    return id
  }
}

export default CoreContainer
