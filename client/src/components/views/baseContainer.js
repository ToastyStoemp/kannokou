/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

'use strict'

class BaseContainer {
  constructor () {
    this.dom = document.createElement('div')
    this.structure = null
  }

  build () {
    this.buildChildren(this.dom, this.structure)

    return this.dom
  }

  buildChildren (parent, target) {
    Object.keys(target).forEach(function (struct) {
      switch (struct) {
        case '_class' : {
          parent.setAttribute('class', target._class)
          break
        }
        case '_content' : {
          parent.innerHTML = target._content
          break
        }
        case '_type' : {
          // var latestElem = parent.appendChild(this.makeElement(target[struct]))
          console.log(target[struct])
          break
        }
        default : {
          var structName = struct.indexOf('_') === -1 ? struct : struct.substring(0, struct.indexOf('_'))
          var latestElem = parent.appendChild(this.makeElement(structName))
          this.buildChildren(latestElem, target[struct])
          break
        }
      }

      console.log(struct)
      console.log(parent)
    }.bind(this))
  }

  makeElement (type, elemClass, contents) {
    var newElement = document.createElement(type)
    if (typeof elemClass !== 'undefined') newElement.setAttribute('class', elemClass)
    if (typeof contents !== 'undefined') newElement.innerHTML = contents

    return newElement
  }

  setAttributes (dom, attribs) {
    for (var key in attribs) {
      dom.setAttribute(key, attribs[key])
    }
  }
}

export default BaseContainer
