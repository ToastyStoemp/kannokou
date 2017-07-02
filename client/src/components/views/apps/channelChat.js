/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

'use strict'

import BaseContainer from '../base/baseContainer'

class ChannelChat extends BaseContainer {
  constructor (parentDom, initialData) {
    super()

    this.appName = 'chat'
    this.appEID = parentDom.id

    // check and report errors
    this.hasError = false
    if (typeof initialData.err !== 'undefined') {
      this.hasError = true
      this.chan = 'Error!'

      // output error
      global.Materialize.toast(initialData.err, 4000, 'orange darken-4')

      // close tab
      setTimeout(function () {
        this.emitEvent('tabEvent', {
          appEID: this.appEID,
          ui: 'ChannelChat',
          eType: 'close',
          close: true
        })
      }.bind(this), 1)

      return
    }

    this.rows = 0
    this.peers = initialData.peers
    this.chan = initialData.chan
    this.unseenMsgs = 0

    this.inputID = parentDom.id + 'mainInput'

    this.structure = {
      div: {
        _class: 'max-height: 100%; min-height: 100%;',

        ul: {
          _class: 'collection'
        },

        div: {
          _class: 'input-field',
          _id: this.inputID,

          input: {
            _class: 'white-text',
            _type: 'text',
            _placeholder: 'Send Message',
            // to-do: fix this onclick convention
            _onkeyup: 'if(event.keyCode != 13)return;' +
              'var fwEvent = new Event("routeAppData");fwEvent.eventData = {' +
              'appName:\'' + this.appName + '\',' +
              'id:\'' + this.appEID + '\',' +
              'args:{' +
              'msg:this.value,' +
              'act:\'msg\',' +
              'chan:\'' + this.chan + '\'}' +
              '};document.dispatchEvent(fwEvent);this.value=\'\''
          }
        }
      }
    }

    var names = []

    initialData.peers.forEach(function (info) {
      names.push(info.nick)
    })

    names.push(initialData.nick)

    this.addRow(
      'Kannokou',
      false,
      'https://avatars0.githubusercontent.com/u/17520604?v=3&s=460',
      'Connected to ' + this.chan + '! Users online: ' + names.join(', ')
    )
  }

  addRow (nick, isPeer, avatar, rowContent) {
    var rowElName = 'li_' + this.rows
    var rowStruct = {
      [rowElName]: {
        _class: 'collection-item avatar orange-text text-darken-4',

        img: {
          _class: 'circle',
          _src: avatar,
          _alt: nick
        },

        span: {
          _class: 'title',
          _content: nick + ' sez,'
        },

        pre: {
          _style: '',
          _class: 'white-text',
          _content: rowContent
        }
      }
    }

    if (this.rows % 2) {
      rowStruct[rowElName]._class += ' grey darken-3'
    } else {
      rowStruct[rowElName]._class += ' grey darken-4'
    }

    this.structure.div.ul[rowElName] = rowStruct[rowElName]

    if (this.built) {
      this.dom.firstChild.firstChild.appendChild(this.getDomByStruct({ [rowElName]: rowStruct[rowElName] }).firstChild)
      this.refresh()
    }

    if (!this.visible) {
      this.unseenMsgs++
      this.setNotifCount(this.unseenMsgs)
    }

    this.rows++
  }

  onBuild () {
    this.refresh()
    this.visible = true
  }

  afterBuild (leftNav) {
    this.changeTabLabel(this.chan)

    this.updateLeftNav(leftNav)
  }

  refresh () {
    if (!this.visible) return
    // to-do: prevent this if parentNode is scrolled
    setTimeout(function () {
      global.$('#' + this.dom.parentNode.id).animate({
        scrollTop: global.$(this.dom).height()
      }, 650) // jquery sucks so bad
    }.bind(this), 1)
  }

  handle (eData, leftNav) {
    // console.log(eData)
    switch (eData.eType) {
      // ui events //
      case 'onShown' :
        this.visible = true
        this.setNotifCount(0)
        this.unseenMsgs = 0

        this.updateLeftNav(leftNav)

        this.refresh()
        break
      case 'onHidden' :
        this.visible = false
        break
      case 'onClose' :
        if (this.hasError) return

        this.emitEvent('routeAppData', {
          appName: this.appName,
          id: this.appEID,
          args: {
            act: 'close',
            chan: this.chan
          }
        })
        break
      // channel events //
      case 'err' : // error handler
        console.log(eData)
        break
      case 'm' : // channel message
        this.addRow(eData.ad.nick.replace(/</g, '&lt;'), true, 'https://avatars0.githubusercontent.com/u/17520604?v=3&s=460', eData.ad.msg)
        break
      case 'j' : // user joined
        this.addRow('Kannokou', true, 'https://avatars0.githubusercontent.com/u/17520604?v=3&s=460', eData.nick + ' joined')
        this.peers.push({ nick: eData.nick.replace(/</g, '&lt;'), peer: true, id: eData.id, avtr: 'https://avatars0.githubusercontent.com/u/17520604?v=3&s=460' })
        this.updateLeftNav(leftNav)
        break
      case 'l' : // user left
        this.addRow('Kannokou', true, 'https://avatars0.githubusercontent.com/u/17520604?v=3&s=460', eData.ad.nick.replace(/</g, '&lt;') + ' left')
        for (var i = 0; i < this.peers.length; i++) {
          if (this.peers[i].id === eData.ad.id) {
            this.peers.splice(i, 1)
          }
        }

        this.updateLeftNav(leftNav)
        break
    }
  }

  updateLeftNav (leftNav) {
    if (this.hasError) return

    var newStruct = {}
    var appendTarget = null

    // add channel objects //
    newStruct['ul_obj'] = {
      _class: 'collapsible',
      _data_collapsible: 'accordion',

      li: {
        div_1: {
          _class: 'collapsible-header',
          _content: 'Channel Files',

          i: {
            _class: 'material-icons',
            _content: 'description'
          }
        },

        div_2: {
          _class: 'collapsible-body',
          ul: {}
        }
      }
    }

    appendTarget = newStruct['ul_obj']['li']['div_2']['ul']
    // to-do: add channel object list here //
    appendTarget._content = 'empty'

    // add user list section //
    newStruct['ul_users'] = {
      _class: 'collapsible',
      _data_collapsible: 'accordion',

      li: {
        div_1: {
          _class: 'collapsible-header',
          _content: 'Users (' + this.peers.length + ')',

          i: {
            _class: 'material-icons',
            _content: 'person_pin'
          }
        },

        div_2: {
          _class: 'collapsible-body',
          ul: {}
        }
      }
    }

    appendTarget = newStruct['ul_users']['li']['div_2']['ul']
    if (this.peers.length === 0) {
      appendTarget['li'] = {
        a: {
          _class: 'valign-wrapper',
          _href: '#',
          _content: 'Just you :('
        }
      }
    } else {
      this.peers.forEach(function (peerData, index) {
        appendTarget['li_' + index] = {
          a: {
            _class: 'valign-wrapper',
            _href: '#',
            _content: peerData.nick,
            _onclick: "console.log('" + peerData.nick + " clicked')", // to-do: make it actually do something

            img: {
              _src: peerData.avtr,
              _class: 'circle',
              _style: 'float: left; max-width: 14%; border: solid 2px #E65100; margin: 5px 5px 0 0;'
            }
          }
        }
      })
    }

    leftNav.updateStructure(this.chan, newStruct)
  }
}

export default ChannelChat
