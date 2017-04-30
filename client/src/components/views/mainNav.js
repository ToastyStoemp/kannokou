/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

'use strict'

import BaseContainer from './baseContainer'

class MainNav extends BaseContainer {
  constructor () {
    super()

    this.usernameID = 'navUsername'

    this.structure = {
      _class: 'row scale-transition scale-transition hide scale-out',
      _style: 'margin-bottom: 0px;',

      nav: {
        _class: 'grey darken-3',

        div: {
          _class: 'nav-wrapper',

          a: {
            _href: '#',
            _id: '',
            _class: 'brand-logo orange darken-4',
            _style: 'padding-left: 7px; padding-right: 14px; min-width: 316px;',

            i: {
              _class: 'material-icons',
              _content: 'speaker_notes'
            },

            span: {
              _class: 'black-text',
              _content: 'Channel List',
              _id: 'currentChannel'
            }
          },

          ul: {
            _class: 'right hide-on-med-and-down',

            li_1: {
              a: {
                _href: '#',

                i: {
                  _class: 'material-icons',
                  _content: 'search'
                }
              }
            },

            li_2: {
              a: {
                _href: '#',

                i: {
                  _class: 'material-icons',
                  _content: 'refresh'
                }
              }
            },

            li_3: {
              a: {
                _href: '#',

                span: {
                  _class: 'white-text name',
                  _content: 'Marzavec',
                  _id: this.usernameID
                }
              }
            },

            li_4: {
              div: {
                _class: 'userView',

                a_1: {
                  _href: '#',

                  img: {
                    _class: 'circle',
                    _style: 'max-width: 72px; border: solid 5px #E65100; margin-bottom: -60%; margin-top: 4px;',
                    _src: 'https://avatars0.githubusercontent.com/u/17520604?v=3&s=460'
                  }
                }
              }
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

  changeUsername (newNick) {
    // regex check likely needed here //
    document.getElementById(this.usernameID).innerHTML = newNick
  }
}

export default MainNav
