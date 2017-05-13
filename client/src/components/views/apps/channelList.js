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

  afterBuild () {
    this.changeTabLabel('Channel List')
  }

  handle (eData) {

  }
}

export default ChannelList
