import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import Start from './pages/Start'

const App = () => {
  return (
    <>
    <Routes>
    <Route path='/' element={<Start/>} />
    <Route path='/signup' element={<UserSignup/>} />
    <Route path='/login' element={<UserLogin/>} />
    <Route path='/captain-signup' element={<CaptainSignup/>} />
    <Route path='/captain-login' element={<CaptainLogin/>} />
    </Routes>
    </>
  )
}

export default App
