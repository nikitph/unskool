import io from 'socket.io-client'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'

import { Alert, AsyncStorage } from 'react-native'

import auth from '@feathersjs/authentication-client'

const API_URL = 'http://localhost:3030'
export const socket = io(API_URL, {
  transports: ['websocket'],
  forceNew: true,
  pingTimeout: 3000,
  pingInterval: 5000
})
export const client = feathers()
  .configure(socketio(socket))
  .configure(auth({
    storage: AsyncStorage,
    storageKey: 'auth'
  }))

