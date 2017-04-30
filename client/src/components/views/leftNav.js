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
      /*
      <ul id="slide-out" class="side-nav">
        <li>
          <div class="userView">
            <div class="background">
              <img src="images/office.jpg">
            </div>
            <a href="#!user"><img class="circle" src="images/yuna.jpg"></a>
            <a href="#!name"><span class="white-text name">John Doe</span></a>
            <a href="#!email"><span class="white-text email">jdandturk@gmail.com</span></a>
          </div>
        </li>
        <li><a href="#!"><i class="material-icons">cloud</i>First Link With Icon</a></li>
        <li><a href="#!">Second Link</a></li>
        <li><div class="divider"></div></li>
        <li><a class="subheader">Subheader</a></li>
        <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
      </ul>
      */
      ul: {
        _class: 'side-nav fixed grey darken-3 z-depth-0',
        _style: 'transform: translateY(-3px); height: calc(100vh - 64px);',
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
