/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

'use strict'

import BaseContainer from './baseContainer'

class LoginContainer extends BaseContainer {
  constructor () {
    super()

    this.structure = {
      _class: 'row scale-transition',
      _style: 'width: 20vw; min-width: 325px;',  // to-do: fix this

      div: {
        _class: 'col s12 z-depth-4 card-panel',

        form: {
          _class: 'login-form',

          div_1: {
            _class: 'row',

            div: {
              _class: 'input-field col s12 center',

              img: {
                _class: 'circle responsive-img valign profile-image-login',
                _style: 'max-width: 33%',
                _src: 'https://avatars0.githubusercontent.com/u/17520604?v=3&s=460'
              },

              p: {
                _class: 'center login-form-text',
                _content: 'Kannokou Login'
              }
            },

            div_2: {
              _class: 'row margin',

              div: {
                _class: 'input-field col s12',

                i: {
                  _class: 'material-icons prefix',
                  _content: 'perm_identity'
                },

                input: {
                  _id: 'loginUsername',
                  _type: 'text'
                },

                label: {
                  _for: 'loginUsername',
                  _class: 'center-align',
                  _content: 'Username'
                }
              }
            },

            div_3: {
              _class: 'row margin',

              div: {
                _class: 'input-field col s12',

                i: {
                  _class: 'material-icons prefix',
                  _content: 'lock_outline'
                },

                input: {
                  _id: 'loginPassword',
                  _type: 'password'
                },

                label: {
                  _for: 'loginPassword',
                  _class: 'center-align',
                  _content: 'Password'
                }
              }
            },

            div_4: {
              _class: 'row',

              div: {
                _class: 'input-field col s12 m12 l12 login-text',

                input: {
                  _type: 'checkbox',
                  _id: 'loginRememberMe'
                },

                label: {
                  _for: 'loginRememberMe',
                  _content: 'Remember me'
                }
              }
            },

            div_5: {
              _class: 'row',

              div: {
                _class: 'input-field col s12',

                a: {
                  _href: '#',
                  _class: 'btn waves-effect waves-light col s12',
                  _content: 'Login',
                  _onclick: 'var fwEvent = new Event("doLogin");fwEvent.eventData = { loginUsername:document.getElementById("loginUsername").value, loginPassword:document.getElementById("loginPassword").value, remember:document.getElementById("loginRememberMe").checked };document.dispatchEvent(fwEvent)'
                }
              }
            },

            div_6: {
              _class: 'row',

              div_1: {
                _class: 'input-field col s6 m6 l6',

                p: {
                  _class: 'margin medium-small',

                  a: {
                    _href: '#',
                    _content: 'Register Now!'
                  }
                }
              },

              div_2: {
                _class: 'input-field col s6 m6 l6',

                p: {
                  _class: 'margin right-align medium-small',

                  a: {
                    _href: '#',
                    _content: 'Forgot password ?'
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
}

export default LoginContainer
