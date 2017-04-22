/*
  Developer: Toastystoemp, Marzavec
  Description:
*/

import wsConfig from './components/configs/websocket'

import core from './components/core/core'
import websocket from './components/core/websocket'

wsConfig.init(window.location.hostname)

core.init()
websocket.init(wsConfig)
