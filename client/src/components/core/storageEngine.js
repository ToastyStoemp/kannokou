/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

'use strict'

class StorageEngine {
  constructor () {
    if (typeof window.localStorage === 'undefined' || typeof window.sessionStorage === 'undefined') {
      global.alert('Your browser is blocking or does not support local storage. #fixit')
    }
  }

  getObj (name) {
    return false
  }

  storeObj (name, data) {
    return false
  }

  deleteObj (name) {
    return false
  }

  getSessionObj (name) {
    return false
  }

  storeSessionObj (name, data) {
    return false
  }

  deleteSessionObj (name) {
    return false
  }

  unset () {

  }
}

export default StorageEngine
