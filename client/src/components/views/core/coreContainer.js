/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

'use strict'

import BaseContainer from '../base/baseContainer'

class CoreContainer extends BaseContainer {
  constructor () {
    super()

    this.tabCount = 0
    this.coreTabsID = 'coreTabs'
    this.curTabID = null

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

  addNewAppSpace (title, useLoader, switchTo) {
    if (typeof useLoader === 'undefined') useLoader = true
    if (typeof switchTo === 'undefined') switchTo = false

    var id = 'ct_' + this.tabCount++

    var appSpaceBtn = {
      li: {
        _class: 'tab col s3',

        span: {
          _id: id + '_evts',
          _class: 'new badge hide',
          _style: 'margin: 7px; margin-bottom: -100%;',
          _content: ''
        },

        a: {
          _id: id + '_label',
          _href: '#' + id,
          _content: title
        }
      }
    }

    var appSpaceContent = {
      _id: id,
      _class: 'grey darken-3',
      _style: 'padding: 7px; max-height: calc(100vh - 160px); height: calc(100vh - 160px); overflow-y: scroll; display: block;', // to-do: fix this
      _child: null
    }

    if (useLoader) appSpaceContent._child = this.getPreloader()

    document.getElementById(this.coreTabsID).appendChild(this.getDomByStruct(appSpaceBtn).firstChild)
    var spaceDom = this.getDomByStruct(appSpaceContent)
    document.getElementById(this.coreTabsID).parentNode.appendChild(spaceDom)

    setTimeout(function () {
      global.$('ul.tabs').tabs({
        onShow: function (tab) {
          if (this.curTabID !== null) {
            var fwEvent = new global.Event('tabEvent')
            fwEvent.eventData = {
              appEID: this.curTabID,
              eType: 'onHidden'
            }
            document.dispatchEvent(fwEvent)
          }

          var newTabID = tab.selector.substring(1)
          fwEvent = new global.Event('tabEvent')
          fwEvent.eventData = {
            appEID: newTabID,
            eType: 'onShown'
          }
          document.dispatchEvent(fwEvent)

          this.curTabID = newTabID
        }.bind(this)
      }).bind(document) // jquery sucks so bad
    }, 1)

    if (switchTo) {
      setTimeout(function () {
        global.$('ul.tabs').tabs('select_tab', id) // jquery sucks so bad
      }, 2)
    }

    return { id: id, dom: spaceDom }
  }
}

export default CoreContainer
