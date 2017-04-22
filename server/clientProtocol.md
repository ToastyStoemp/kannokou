
  Client Protocol Overview
    Commands are push by using the 'c' property of a packet object.
    Commands are push by using the 'e' property of a packet object.

    Push:
      packet.c
        'p'; ping, to keep the websocket connection open, no reply

        'j'; join a different channel, response will be channel info

        'i'; quest client environment, response will be client info
