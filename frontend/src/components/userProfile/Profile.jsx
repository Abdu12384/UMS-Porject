import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch} from 'react-redux'
import '../../assets/styles/Profile.scss'
import { logout } from '../../redux/slice/UserSlice'
import { User, Mail, Phone,Edit2,LogOut } from 'lucide-react';


function UserProfile() {
  const dispatch = useDispatch()
  const user= useSelector((state)=>state.auth.user)
   
  
  const [error, setError]= useState('')
  const [isLogoutPopupVisible, setIsLogoutPopupVisible] = useState(false) // State for logout confirmation popup

  
  const navigate = useNavigate()


   function handleEdit(){
    const confirmEdit = window.confirm("Do you want to edit your profile?");
    if (confirmEdit) {
      navigate('/edit');
   }
  }

  function handleLogout() {
    setIsLogoutPopupVisible(true) // Show logout confirmation popup
  }


   function confirmLogout(){
      dispatch(logout()) 
      axios.post('http://localhost:3000/user/logout',{},{withCredentials:true})
      navigate('/login')
   }

    
  function cancelLogout() {
    setIsLogoutPopupVisible(false) // Close the confirmation popup
  }

  //  useEffect(() => {
    
  //     const  fetcProfile = async () =>{
      
  //       try {

  //         const response = await axios.get('http://localhost:3000/user/profile',{
  //            withCredentials:true
  //         })
  //        console.log(response.data.user);
         
          
  //       } catch (error) {
  //         setError('Failed to fetch user profile')
  //       }     
  //     }
  //     if(!user){

  //       fetcProfile();
  //     }

  //  },[user,navigate])
    
   
  return (

<div className="user-profile-container">
<div className="profile-card">
  <h1>User Profile</h1>
  {error && <p className="error">{error}</p>}
  <div className="profile-image-container">
    <img
      src={user?.profileImage ? `http://localhost:3000${user.profileImage}` : '/src/assets/dummy.jpg'}
      alt="Profile"
      className="profile-image"
    />
  </div>
  {user ? (
    <div className="profile-info">
      <div className="info-item">
        <User size={20} />
        <p><b>Name:</b> {user.name}</p>
      </div>
      <div className="info-item">
        <Mail size={20} />
        <p><b>Email:</b> {user.email}</p>
      </div>
      <div className="info-item">
        <Phone size={20} />
        <p><b>Mobile:</b> {user.mobile}</p>
      </div>
    </div>
  ) : (
    <p className="loading">Loading profile...</p>
  )}
  <div className="button-container">
    <button onClick={handleEdit} className="edit-button">
      <Edit2 size={16} />
      Edit
    </button>
    <button onClick={handleLogout} className="logout-button">
      <LogOut size={16} />
      Logout
    </button>
  </div>
</div>
{isLogoutPopupVisible && (
        <div className="confirmation-popup">
          <div className="popup-content">
            <h3>Are you sure you want to log out?</h3>
            <button className="confirm-btn" onClick={confirmLogout}>
              Confirm
            </button>
            <button className="cancel-btn" onClick={cancelLogout}>
              Cancel
            </button>
          </div>
        </div>
      )}

</div>
  )
}

export default UserProfile