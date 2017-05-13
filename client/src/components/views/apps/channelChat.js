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
    // this.addRow(info.nick, info.peer, 'https://avatars0.githubusercontent.com/u/17520604?v=3&s=460', info.data)
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

  afterBuild () {
    this.changeTabLabel(this.chan)
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

  handle (eData) {
    // console.log(eData)
    switch (eData.eType) {
      // ui events //
      case 'onShown' :
        this.visible = true
        this.setNotifCount(0)
        this.unseenMsgs = 0
        this.refresh()
        break
      case 'onHidden' :
        this.visible = false
        break
      // channel events //
      case 'm' : // channel message
        this.addRow(eData.ad.nick, true, 'https://avatars0.githubusercontent.com/u/17520604?v=3&s=460', eData.ad.msg)
        break
      case 'j' : // user joined
        this.addRow('Kannokou', true, 'https://avatars0.githubusercontent.com/u/17520604?v=3&s=460', eData.nick + ' joined')
        break
      case 'l' : // user left
        this.addRow('Kannokou', true, 'https://avatars0.githubusercontent.com/u/17520604?v=3&s=460', eData.ad.nick + ' left')
        break
    }
  }
}

export default ChannelChat
