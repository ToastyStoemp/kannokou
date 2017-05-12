/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

'use strict'

import BaseContainer from './baseContainer'

class PagedTable extends BaseContainer {
  constructor (parentDom, initialData) {
    super()

    this.dom.style.width = '100%'

    this.rows = 0
    this.structure = {
      ul: {
        _class: 'collapsible',
        _data_collapsible: 'accordion',
        _style: ''
      }
    }

    this.paginationStruct = {
      // to-do: pagination here
    }

    initialData.forEach(function (info) {
      // console.log(info)
      this.addRow(info.icon, info.title, info.data)
    }.bind(this))
  }

  addRow (icon, title, data) {
    var rowElName = 'li_' + this.rows
    var rowStruct = {
      [rowElName]: {
        div_1: {
          _class: 'collapsible-header grey darken-4 grey-text',
          _content: title,

          i: {
            _class: 'material-icons',
            _content: icon
          }
        },

        div_2: {
          _class: 'collapsible-body white-text',
          _child: this.getDomByStruct(data)
        }
      }
    }

    this.structure.ul[rowElName] = rowStruct[rowElName]

    if (this.built) {
      this.dom.firstChild.appendChild(this.getDomByStruct({ [rowElName]: rowStruct[rowElName] }).firstChild)
      this.refresh()
    }

    this.rows++
  }

  onBuild () {
    this.refresh()
  }

  refresh () {
    setTimeout(function () {
      global.$('.collapsible').collapsible().bind(document) // jquery sucks so bad
    }, 1)
  }

  handle (eData) {
    // console.log('bind handler paged table:')
    // console.log(eData)
  }
}

export default PagedTable
