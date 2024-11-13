import React, { useEffect,useState } from 'react'
import  '../../../assets/styles/AdminHome.scss'
import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { adminLogout } from '../../../redux/slice/AdminSlice'

function AdminHome() {
   const dispatch = useDispatch()
  const admin= useSelector((state) => state.admin.admin)
   
  const  navigate =useNavigate()

  const [isLogoutPopupVisible, setIsLogoutPopupVisible] = useState(false);



  const handleLogout = async () => {
    setIsLogoutPopupVisible(true);
  };

   
   const confirmLogout = async () => {
    await axios.post('http://localhost:3000/admin/logout',{},{withCredentials:true})
    dispatch(adminLogout())
  }
 
  const cancelLogout = () => {
    setIsLogoutPopupVisible(false);
  };


  const handleDashbtn = () =>{
      navigate('/admin/dashboard')
  }

  
  const getAdminHome = async () =>{   
      
     try {
       const response = await axios.get('http://localhost:3000/admin/home',{
          withCredentials:true
       })
    

     } catch (error) {
       console.log('not admin',error);
         navigate('/login')
     }
  }
   useEffect(()=>{
     getAdminHome()
   },[])

  return (
     <div className="admin-home-page">
      <header className="header">
        <div className="container">
          <h1 className="logo">Admin Panel</h1>
          <div className="header-buttons">
            <button className="btn btn-dashboard" onClick={handleDashbtn}>
              <span className="icon icon-dashboard"></span>
              Dashboard
            </button>
            <button className="btn btn-logout" onClick={handleLogout}>
              <span className="icon icon-logout"></span>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <div className="admin-card">
            <div className="admin-info">
              <div className="admin-avatar">
                {admin.profileImage ? (
                  <img src={`http://localhost:3000${admin.profileImage}`} />
                ) : (
                  <div className="avatar-placeholder">{admin.name.charAt(0)}</div>
                )}
              </div>
              <div className="admin-details">
                <h2 className="admin-name">Welcome, {admin.name}</h2>
                <p className="admin-role">Administrator</p>
              </div>
            </div>
            <div className="admin-contact">
              <span className="icon icon-email"></span>
              <span>{admin.email}</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Admin Panel. All rights reserved.</p>
        </div>
      </footer>
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
export default AdminHome
