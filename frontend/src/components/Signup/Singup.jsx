import React, { useState } from 'react'
import axios from 'axios'
import '../../assets/styles/Signup.scss';
import { toast } from 'react-toastify';
import { User, Mail, Phone,UserPlus,Lock} from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';


function Singup() {
  
  const [formData, setFormData]=useState({
    name:'',
    email:'',
    password:'',
    mobile:'',
  })
  const [errors, setErrors] = useState({});
  const [message, setMessage]=useState("")
  const navigate = useNavigate()



  const validateField = (name, value) => {
    let error = '';
    
    if (name === 'name') {
      if (!value) error = 'Name is required';
    }
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) error = 'Email is required';
      else if (!emailRegex.test(value)) error = 'Invalid email format';
    }
    if (name === 'mobile') {
      if (!value) error = 'Mobile number is required';
      else if (value.length !== 10 || isNaN(value)) error = 'Mobile must be 10 digits';
    }
    if (name === 'password') {
      if (!value) error = 'Password is required';
      else if (value.length < 6) error = 'Password must be at least 6 characters';
    }
    
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };
  
  
  
  const handleChange= (e)=>{
      const {name, value}= e.target
      setFormData({ ...formData, [name]: value });
     validateField(name,value)
  }

  const handleSubmit = async (e)=>{
     e.preventDefault()

     const newErrors = {};
     Object.keys(formData).forEach((key) => {
       if (!formData[key]) {
         newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
       }
     });
     setErrors(newErrors);
 

     try {
       
      const response = await axios.post('http://localhost:3000/auth/signup',formData)
      toast.success(response.data.message)

       setTimeout(() =>{
         navigate('/login')
       },2000)
      
     } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message === 'Email already in use') {

        setMessage('Email already in use');
        toast.error('Email already in use');
      } else {
        setMessage(error.response?.data?.message || 'Signup failed');
        toast.error(error.response?.data?.message || 'Signup failed');
      }
     }
  }

  return (
    
    <div className="signup-container">
    <div className="signup-card">
      <h2 className="signup-title">Create an Account</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            <User size={20} />
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
       {errors.name && <p className="signup-error-message">{errors.name}</p>}

        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">
            <Mail size={20} />
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
          />
      {errors.email && <p className="signup-error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="mobile">
            <Phone size={20} />
            Mobile
          </label>
          <input
            type="number"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile number"
          />
        {errors.mobile && <p className="signup-error-message">{errors.mobile}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">
            <Lock size={20} />
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a strong password"
          />
           {errors.password && <p className="signup-error-message">{errors.password}</p>}
        </div>

        <button type="submit" className="submit-button">
          <UserPlus size={20} />
          Sign Up
        </button>
      </form>
      {message && <p className="signup-msg-fail">{message}</p>}
    </div>
  </div>
  )
}

export default Singup
