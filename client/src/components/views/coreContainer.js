/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

'use strict'

import BaseContainer from './baseContainer'

class CoreContainer extends BaseContainer {
  constructor () {
    super()

    this.tabCount = 0
    this.coreTabsID = 'coreTabs'

    this.structure = {
      _class: 'row scale-transition scale-transition hide scale-out',
      _style: 'width: 60vw', // to-do: fix this //

      div_1: {
        _class: 'col s12 no-padding',

        ul: {
          _class: 'tabs tabs-fixed-width grey darken-3',
          _id: this.coreTabsID
        }
      }
    }

    this.bindEvents()
  }

  bindEvents () {

  }

  unbindEvents () {

  }

  addNewAppSpace (title, useLoader) {
    if (typeof useLoader === 'undefined') useLoader = true

    // to-do: update this whole function with proper code, I mean do you see that crap innerHTML call? #lazy
    var id = 'ct_' + title + this.tabCount++

    var tab = document.createElement('li')
    tab.setAttribute('class', 'tab col s3')
    document.getElementById(this.coreTabsID).appendChild(tab)

    var tabLink = document.createElement('a')
    tabLink.href = '#' + id
    tabLink.innerHTML = title
    tab.appendChild(tabLink)

    var content = document.createElement('div')
    content.setAttribute('id', id)
    content.setAttribute('class', 'grey darken-3 valign-wrapper')
    content.style.height = '50vh'
    document.getElementById(this.coreTabsID).parentNode.appendChild(content)

    if (useLoader) content.innerHTML = '<div class="preloader-wrapper big active" style="margin: 0 auto;"><div class="spinner-layer spinner-red-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>'
    if (this.tabCount === 1) tabLink.setAttribute('class', 'active')
    if (this.tabCount === 1) global.$('ul.tabs').tabs() // jquery sucks so bad
    // if (this.tabCount === 1) global.$('ul.tabs').tabs('select_tab', id) // jquery sucks so bad

    return id
  }
}

export default CoreContainer
