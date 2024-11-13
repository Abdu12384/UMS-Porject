import React, { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { adminLogin } from '../../../redux/slice/AdminSlice'
import { useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify'
import '../../../assets/styles/AdminLogin.scss'



function AdiminLogin() {
  const [email, setEmail]= useState('')
  const [password, setPassword]= useState('')
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')


  const dispatch = useDispatch()
  const navigate = useNavigate()
   
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const validatePassword = (password) => {
    return password.length >= 6
  }
  
  useEffect(() => {
    if (email && !validateEmail(email)) {
      setEmailError('Invalid email format')
    } else {
      setEmailError('')
    }

    if (password && !validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters')
    } else {
      setPasswordError('')
    }
  }, [email, password])

  

  const handleLogin = async(e)=>{
     e.preventDefault()
      
     let formValid = true;
     if (!email) {
       setEmailError('Email is required');
       formValid = false;
     }
     if (!password) {
       setPasswordError('Password is required');
       formValid = false;
     }
 

     if (!formValid) return;
 

      try {
        const response = await axios.post('http://localhost:3000/admin/login',
          {email,password},
        {withCredentials:true}
        )
        console.log(response);
        
        const  {admin} = response.data
         dispatch(adminLogin({admin}))
          
          
         navigate('/admin/home')
      } catch (error) {
        toast.error('Login failed. Please check your credentials', { position: 'top-right' })
      }

  }


  return (

<div className="admin-login">
<div className="login-container">
  <h2>Admin Login</h2>
  {error && <p className="error">{error}</p>}
  <form onSubmit={handleLogin} className="form">
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <div className="input-wrapper">
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={emailError ? 'error' : ''}
          placeholder="Enter your email"
        />
        <span className="input-icon">✉️</span>
      </div>
      {emailError && <p className="ad-l-error">{emailError}</p>}
    </div>
    <div className="form-group">
      <label htmlFor="password">Password</label>
      <div className="input-wrapper">
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={passwordError ? 'error' : ''}
          placeholder="Enter your password"
        />
        <span className="input-icon">🔒</span>
      </div>
      {passwordError && <p className="ad-l-error">{passwordError}</p>}
    </div>
    <button type="submit">Login</button>
  </form>
</div>
</div>
  )
}

export default AdiminLogin
