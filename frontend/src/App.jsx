import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import Start from './pages/Start'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'

const App = () => {
  return (
    <>
    <Routes>
    <Route path='/' element={<Start/>} />
    <Route path='/signup' element={<UserSignup/>} />
    <Route path='/login' element={<UserLogin/>} />
    <Route path='/captain-signup' element={<CaptainSignup/>} />
    <Route path='/captain-login' element={<CaptainLogin/>} />
    <Route path='/home' element={
      <UserProtectWrapper>
      <Home/>
      </UserProtectWrapper>
  } />
    <Route path='/user/logout' element={
      <UserProtectWrapper>
      <UserLogout/>
      </UserProtectWrapper>
  } />
    </Routes>
    </>
  )
}

export default App
