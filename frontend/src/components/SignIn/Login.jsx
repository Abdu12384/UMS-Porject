import React, { useState,useEffect } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import {login} from '../../redux/slice/UserSlice'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/styles/Login.scss'
import {Mail, Lock, ArrowRight} from 'lucide-react'


function Login() {
   const [formData, setFormData]=useState({
    email:'',
    password:''
   })
  const [message, setMessage]= useState('')
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
   if (formData.email && !validateEmail(formData.email)) {
     setEmailError('Invalid email format')
   } else {
     setEmailError('')
   }

   if (formData.password && !validatePassword(formData.password)) {
     setPasswordError('Password must be at least 6 characters')
   } else {
     setPasswordError('')
   }
 }, [formData.email, formData.password])


     
  const handleChange = (e)=>{
     setFormData({...formData, [e.target.name]: e.target.value})
  }


  const handleSubmit = async (e)=>{
     e.preventDefault()
     
     let formValid = true;
     if (!formData.email) {
       setEmailError('Email is required');
       formValid = false;
     }
     if (!formData.password) {
       setPasswordError('Password is required');
       formValid = false;
     }
 
     if (!formValid) return;
 



     try {

      const response = await axios.post('http://localhost:3000/auth/login',formData,{withCredentials:true})

             
       const user = response.data.user

        dispatch(login({user}))
         setMessage(response.data.message)
        toast.success('Login successful!');
        navigate('/home')
      
     } catch (error) {
      console.error(error)
      if (error.response?.status === 403) {
        toast.error('Admins cannot login as users.');
      } else if (error.response?.status === 400) {
        toast.error(error.response?.data?.message || 'Login failed');
      } else {
        toast.error('An unexpected error occurred');
      }
  
     }
  }



  return (
   
    <div className="user-login-container">
    <div className="login-form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <div className="input-wrapper">
            <Mail className="input-icon" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
             />

          </div>
          {emailError && <p className="error">{emailError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="input-wrapper">
            <Lock className="input-icon" />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />

          </div>
          {passwordError&& <p className="error">{passwordError}</p>}
        </div>
        <button type="submit">Sign in</button>
      </form>
       <a className='sign' href="/signup">Signup?</a>
    </div>
     {message && <p className='error'>{message}</p>}
    <ToastContainer position="top-right" autoClose={3000} />
  </div>
  )
  
}

export default Login
