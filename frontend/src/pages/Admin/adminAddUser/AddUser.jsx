import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import '../../../assets/styles/AddUser.scss'
import { User, Mail, Phone,AlertCircle,Lock } from 'lucide-react';

function AddUser() {
   
   const [formData, setFormData]= useState({
    name:'',
    email:'',
    mobile:'',
    password:''
   })
  
   const [errors, setErrors] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  })


   const [message, setMessage] = useState('')
   const navigate = useNavigate()
   

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const validateMobile = (mobile) => {
    return mobile.length === 10 && !isNaN(mobile)
  }


   const handleChange = (e) =>{
    
    const { name, value } = e.target;
  
  // Update form data state
  setFormData((prev) => ({
    ...prev,
    [name]: value
  }));

    
     if (name === 'name') {
      setErrors((prev) => ({
        ...prev,
        name: value ? '' : 'Name is required'
      }))
    } else if (name === 'email') {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? '' : 'Invalid email format'
      }))
    } else if (name === 'mobile') {
      setErrors((prev) => ({
        ...prev,
        mobile: validateMobile(value) ? '' : 'Mobile number must be 10 digits'
      }))
    } else if (name === 'password') {
      setErrors((prev) => ({
        ...prev,
        password: value.length >= 6 ? '' : 'Password must be at least 6 characters'
      }))
    }
      
   }

   const handleSubmit = async (e) =>{
      e.preventDefault()
  
      if (!formData.name || !formData.email || !formData.mobile || !formData.password) {
        setErrors({
          name: !formData.name ? 'Name is required' : '',
          email: !validateEmail(formData.email) ? 'Invalid email format' : '',
          mobile: !validateMobile(formData.mobile) ? 'Mobile number must be 10 digits' : '',
          password: formData.password.length < 6 ? 'Password must be at least 6 characters' : ''
        })
        return
      }
  
      try {
        const response = await axios.post('http://localhost:3000/admin/addUser',formData,{
           withCredentials:true
        })
         setMessage(response.message)
         console.log(response.data.message);
         
        toast.success('User added successfully!') 
        navigate('/admin/dashboard')
      } catch (error) {

        if (error.response && error.response.status === 400) {
          setErrors((prev) => ({
            ...prev,
            email: error.response.data.message  
          }));
        } else {
          console.error('Error adding user:', error);
          toast.error('Error adding user. Please try again later.');
        }
      }
   }
  

  return (
    
    <div className="add-user-container">
    <div className="add-user-card">
      <div className="card-header">
        <h2 className="card-title">
          <User className="icon" />
          Add New User
        </h2>
      </div>
      <div className="card-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              <User className="icon" />
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'error' : ''}`}
            />
            {errors.name && (
              <p className="error-message">
                <AlertCircle className="icon" />
                {errors.name}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <Mail className="icon" />
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
            />
            {errors.email && (
              <p className="error-message">
                <AlertCircle className="icon" />
                {errors.email}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="mobile" className="form-label">
              <Phone className="icon" />
              Mobile
            </label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={handleChange}
              className={`form-input ${errors.mobile ? 'error' : ''}`}
            />
            {errors.mobile && (
              <p className="error-message">
                <AlertCircle className="icon" />
                {errors.mobile}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <Lock className="icon" />
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'error' : ''}`}
            />
            {errors.password && (
              <p className="error-message">
                <AlertCircle className="icon" />
                {errors.password}
              </p>
            )}
          </div>

          <button type="submit" className="form-button">
            Save User
          </button>
        </form>

        {message && (
          <div className="success-message">
            <CheckCircle2 className="icon" />
            {message}
          </div>
        )}
      </div>
    </div>
  </div>
  )
}

export default AddUser
