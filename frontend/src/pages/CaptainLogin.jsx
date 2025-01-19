import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captainData, setCaptainData] = useState('')
  
  const submitHandler = (e) =>{
  e.preventDefault();
  setCaptainData({
    email: email,
    password: password
  })
  
  
  
  setEmail('')
  setPassword('')
  
  }
  
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
     <div>
     <form onSubmit={(e) =>{
      submitHandler(e)
     }}>
      <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
     <h3 className='text-lg font-medium mb-2'>What's your email</h3>
     <input 
     required 
     value={email}
     onChange={(e) =>{
      setEmail(e.target.value);
     }}
     className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
     type="email" 
     placeholder='email@example.com' />

     <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
     <input 
     className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
     required 
     value={password}
     onChange={(e) =>{
      setPassword(e.target.value);
     }}
     type="password" 
     placeholder='password' />

     <button
     className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full textx-lg'
     >Login</button>
     </form>
     <p className='text-center'>Join a fleet? <Link to={'/captain-signup'} className='text-blue-500'>Register as a Captain</Link> </p> 
     </div>
     <div>
      <Link to={'/login'}
      className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 border w-full textx-lg'
      >Sign in as a User</Link>
     </div>
    </div>
  )
}

export default CaptainLogin
