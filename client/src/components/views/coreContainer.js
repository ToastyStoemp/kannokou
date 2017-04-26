/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

'use strict'

import BaseContainer from './baseContainer'

class CoreContainer extends BaseContainer {
  constructor () {
    super()

    this.structure = {
      _class: 'fixed-action-btn horizontal click-to-toggle',

      a: {
        _class: 'btn-floating btn-large red',

        i: {
          _class: 'large material-icons',
          _content: 'menu'
        }
      },

      ul: {
        li_1: {
          a: {
            _class: 'btn-floating green',

            i: {
              _class: 'material-icons',
              _content: 'publish'
            }
          }
        },

        li_2: {
          a: {
            _class: 'btn-floating blue',

            i: {
              _class: 'material-icons',
              _content: 'insert_chart'
            }
          }
        }
      }
    }

    this.bindEvents()
  }

  bindEvents () {

  }

  unbindEvents () {

  }
}

export default CoreContainer
