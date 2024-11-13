import React, { useEffect, useState } from 'react'
import './EditProfile.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {  toast } from 'react-toastify';
import { updateUser } from '../../redux/slice/UserSlice'
import { User, Mail, Phone,Save,Image } from 'lucide-react';





function EditProfile() {

   
  const dispatch = useDispatch()
  const navigate = useNavigate()

   

  const user = useSelector((state)=> state.auth.user)
  
     

   

  const [name, setName]  = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '') 
  const [mobile, setMobile] = useState(user?.mobile || '') 
  const [ProfileImage, setProfileImage] = useState(null) 
  const [error, setError] = useState('') 
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [mobileError, setMobileError] = useState('')
  const [previewImage, setPreviewImage] = useState(user?.profileImage || ''); // State to store the preview URL
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State to control the visibility of the popup


  useEffect(() => {
    if (user?.profileImage) {
      setPreviewImage(`http://localhost:3000${user.profileImage}`);
    }
  }, [user]);

  
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }
  

  const validateMobile = (mobile) => {
    return mobile.length === 10 && !isNaN(mobile)
  }

   

   const handleImageChange = (e) => {
      const file = e.target.files[0]
       if(file){
        setProfileImage(file)
        setPreviewImage(URL.createObjectURL(file))
       }
   }

   
   const handleSaveChange = async (e) =>{
      //  e.preventDefault();

       setNameError('')
       setEmailError('')
       setMobileError('')
      
       if (!name) {
        setNameError('Name is required')
        return
      }
      if (!email || !validateEmail(email)) {
        setEmailError('Invalid email format')
        return
      }
      
      if (!mobile || !validateMobile(mobile)) {
        setMobileError('Mobile number must be 10 digits')
        return
      }
            
       const formData = new FormData()
       formData.append('name', name)
       formData.append('email', email)
       formData.append('mobile', mobile)
       if(ProfileImage){
         formData.append('profileImage',ProfileImage)
         console.log(formData.get('profileImage'));
         
       }      
           
       
       try {
         

        const response = await axios.put(`http://localhost:3000/user/update/${user._id}`,formData,{
           headers:{
             'Content-Type':'multipart/form-data',
            },
            withCredentials:true
           
          })
          
          toast.success('Profile updated successfully!', { position: "top-right" });
          dispatch(updateUser(response.data.user))
          console.log('responsmessage like',response.data.message)
          navigate('/profile')
        
        } catch (error) {
          toast.error('Failed to update profile.', { position: "top-right" });
         setError('Faild to update profile')
       }
   }; 

   const handleConfirmSave = () => {

    setIsPopupVisible(false); 
    handleSaveChange(); 
  };

  const handleCancelSave = () => {
    setIsPopupVisible(false); 
  };




  return (
    <div className="edit-profile-user">
      <div className="edit-profile-card">
        <h1>Edit Profile</h1>
        {error && <p className={`message ${error.includes('successfully') ? 'success' : 'error'}`}>{error}</p>}
        <form onSubmit={handleSaveChange}>
          <div className="image-upload">
            <label htmlFor="profile-image">      
            {previewImage ? (
                <img src={previewImage} alt="Profile Preview" className="profile-image-preview" />
              ) : (
                <div className="image-placeholder">
                  <Image size={40} />
                  <span>Upload Image</span>
                </div>
              )}
            </label>
            <input
              type="file"
              id="profile-image"
              onChange={handleImageChange}
              className="hidden-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="name">
              <User size={20} />
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
            {nameError && <p className="error">{nameError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">
              <Mail size={20} />
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            
            />
            {emailError && <p className="error">{emailError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="mobile">
              <Phone size={20} />
              Mobile
            </label>
            <input
              type="number"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your mobile number"
            />
            {mobileError && <p className="error">{mobileError}</p>}
          </div>
          
          <button
            type="button"
            className="save-button"
            onClick={() => setIsPopupVisible(true)} // Show the confirmation pop-up
          >
            <Save size={20} />
            Save Changes
          </button>

           {/* Confirmation Pop-up */}
           {isPopupVisible && (
            <div className="confirmation-popup">
              <div className="popup-content">
                <h3>Are you sure you want to save these changes?</h3>
                <button className="confirm-btn" onClick={handleConfirmSave}>
                  Confirm
                </button>
                <button className="cancel-btn" onClick={handleCancelSave}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default EditProfile
