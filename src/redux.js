import { createAction, createReducer } from 'redux-act'
import { createStore } from 'redux'
import io from 'socket.io-client'

const socket = io('/op')

socket.on('req', msg => {
  store.dispatch(newReq(msg))
})

export const newReq = createAction()
export const sendReq = createAction()

export const reduces = createReducer(
  {
    [newReq]: (s, p) => [...s, p],
    [sendReq]: (s, p) => {
      socket.emit('res', p)
      return s.filter(e => e.key !== p.key)
    },
  },
  []
)

export const store = createStore(reduces)
