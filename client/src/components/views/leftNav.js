/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

'use strict'

import BaseContainer from './baseContainer'

class LeftNav extends BaseContainer {
  constructor () {
    super()

    this.structure = {
      _class: 'row scale-transition scale-transition hide scale-out',

      ul: {
        _class: 'side-nav fixed grey darken-3 z-depth-0',
        _style: 'transform: translateY(-3px); height: calc(100vh - 64px);',  // to-do: fix this
        _id: 'leftNav',

        li_1: {
          div: {
            _class: 'orange darken-4',
            _style: 'min-height: 16px;'
          }
        },

        li_2: {
          a: {
            _href: '#',
            _content: 'test!',

            i: {
              _class: 'material-icons',
              _content: 'view_headline'
            }
          }
        },

        li_3: {
          a: {
            _href: '#',
            _content: 'test!',

            i: {
              _class: 'material-icons',
              _content: 'view_headline'
            }
          }
        },

        li_4: {
          a: {
            _href: '#',
            _content: 'test!',

            i: {
              _class: 'material-icons',
              _content: 'view_headline'
            }
          }
        },

        li_5: {
          a: {
            _href: '#',
            _content: 'test!',

            i: {
              _class: 'material-icons',
              _content: 'view_headline'
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

export default LeftNav
