/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

'use strict'

class BaseContainer {
  constructor () {
    this.dom = document.createElement('div')
    this.structure = null

    this.preloaderStruct = {
      _class: 'preloader-wrapper big active',
      _style: 'margin: 0 auto;',

      div: {
        _class: 'spinner-layer spinner-red-only',

        div_1: {
          _class: 'circle-clipper left',

          div: {
            _class: 'circle'
          }
        },

        div_2: {
          _class: 'gap-patch',

          div: {
            _class: 'circle'
          }
        },

        div_3: {
          _class: 'circle-clipper right',

          div: {
            _class: 'circle'
          }
        }
      }
    }
  }

  build () {
    this.buildChildren(this.dom, this.structure)

    return this.dom
  }

  buildChildren (parent, target) {
    Object.keys(target).forEach(function (struct) {
      if (struct[0] === '_') {
        var attr = struct.substring(1)
        if (attr === 'content') {
          parent.innerHTML = target[struct]
        } else if (attr === 'child' && target[struct] !== null) {
          parent.appendChild(target[struct])
        } else {
          parent.setAttribute(attr, target[struct])
        }
      } else {
        var structName = struct.indexOf('_') === -1 ? struct : struct.substring(0, struct.indexOf('_'))
        var latestElem = parent.appendChild(this.makeElement(structName))
        this.buildChildren(latestElem, target[struct])
      }
    }.bind(this))
  }

  getDomByStruct (structure) {
    var returnDom = document.createElement('div')

    this.buildChildren(returnDom, structure)

    return returnDom
  }

  makeElement (type, elemClass, contents) {
    var newElement = document.createElement(type)
    if (typeof elemClass !== 'undefined') newElement.setAttribute('class', elemClass)
    if (typeof contents !== 'undefined') newElement.innerHTML = contents

    return newElement
  }

  setAttributes (attribs) {
    for (var key in attribs) {
      this.dom.setAttribute(key, attribs[key])
    }
  }

  appendAttributes (attribs) {
    var origAttrib = null
    for (var key in attribs) {
      origAttrib = this.dom.getAttribute(key)
      if (origAttrib === null) {
        this.dom.setAttribute(key, attribs[key])
      } else {
        this.dom.setAttribute(key, origAttrib + ' ' + attribs[key])
      }
    }
  }

  removeAttributes (attribs) {
    var newAttrib = null
    for (var key in attribs) {
      newAttrib = this.dom.getAttribute(key).replace(new RegExp(attribs[key], 'g'), '')
      if (newAttrib !== null) {
        this.dom.setAttribute(key, newAttrib)
      }
    }
  }

  show () {
    this.appendAttributes({ class: 'scale-in' })
    this.removeAttributes({ class: 'hide' })
  }

  hide () {
    this.appendAttributes({ class: 'scale-out hide' }) // to-do: add timeout to allow transition
  }

  getPreloader () {
    return this.getDomByStruct(this.preloaderStruct)
  }
}

export default BaseContainer
