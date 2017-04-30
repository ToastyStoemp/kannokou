/*
  Developer = Toastystoemp Marzavec
  Description =
*/

class Protocol {
  constructor () {
    this.PING = 'p'

    this.INIT = 'i'
    this.NEWID = 'cnid'
    this.CHANMETA = 'chmt'
    this.CHANENV = 'chen'
    this.APPLICATION = 'a'
    this.JOIN = 'j'
    this.LASTSESSION = 'ls'
    this.LEAVE = 'l'
    this.NEWUSER = 'n'
    this.USERLEFT = 'd'

    this.USERUPDATE = 'u'

    this.EVENTTYPE = 'et'
    this.EVENTDATA = 'ed'

    this.temp = null
  }
}

export default Protocol
