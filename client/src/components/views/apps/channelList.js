/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

'use strict'

import PagedTable from '../base/pagedTable'

class ChannelList extends PagedTable {
  constructor (parentDom, initialData) {
    super(parentDom, [])

    var dataStruct = {
      _class: 'valign-wrapper',
      _content: '',

      a: {
        _class: 'waves-effect waves-light btn left !important',
        _style: 'margin-left: 14px;',
        _title: '',
        _onclick: 'var fwEvent = new Event(\'remoteStartApp\');' +
                  'fwEvent.eventData = { ' +
                  'appName: \'Chat\', args: { act: "i", chan: this.title } };' +
                  'document.dispatchEvent(fwEvent)', // to-do: this could be done better #lazy
        _content: 'Join Channel',

        i: {
          _class: 'material-icons right',
          _content: 'chat'
        }
      }
    }

    initialData.forEach(function (info) {
      dataStruct._content = info.data
      dataStruct.a._title = info.title
      this.addRow(info.icon, info.title, dataStruct)
    }.bind(this))
  }

  afterBuild (leftNav) {
    this.changeTabLabel('Channel List')

    this.updateLeftNav(leftNav)
  }

  handle (eData, leftNav) {
    switch (eData.eType) {
      // ui events //
      case 'onShown' :
        this.updateLeftNav(leftNav)
        break
    }
  }

  updateLeftNav (leftNav) {
    var newStruct = {}
    // var appendTarget = null

    // add channel objects //
    newStruct['div_chanFilter'] = {
      _class: 'input-field',

      i: {
        _class: 'material-icons prefix',
        _content: 'dns'
      },

      input: {
        _id: 'mChanFilterInput',
        _type: 'text'
      },

      label: {
        _for: 'mChanFilterInput',
        _content: 'Channel Filter'
      }
    }

    leftNav.updateStructure('Channel List', newStruct)
  }
}

export default ChannelList
