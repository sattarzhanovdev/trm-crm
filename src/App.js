import React from 'react'
import './App.scss'
import { Components } from './components'
import MainRoutes from './routes'
import axios from 'axios'

axios.defaults.baseURL = 'https://trmbackend.pythonanywhere.com'

function App() {
  return (
    <div>
      {/* <Components.Navbar /> */}
      {/* <MainRoutes /> */}
      <h2>
        Пожалуйста, оплатите подписку для продолжения использования системы
      </h2>
    </div>
  )
}

export default App
