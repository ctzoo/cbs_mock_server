import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { newReq, sendReq, store } from './redux'
import App from './App'

const container = document.getElementById('container')

render(
  <Provider store={store}>
    <App />
  </Provider>,
  container
)
