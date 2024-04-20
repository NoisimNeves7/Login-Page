import React from 'react'
import Body from './Components/Body'
import { Provider } from 'react-redux'
import { store } from './store/store'

const App = () => {
  return (
    <Provider store={store}>
    <Body/>
    </Provider>
  )
}

export default App