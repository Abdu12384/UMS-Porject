import React from "react"
import { BrowserRouter as Router, Route , Routes } from 'react-router-dom'
import Singup from "./components/Signup/Singup.jsx"
import Login from "./components/SignIn/Login"
import Home from "./pages/UserHome/Home"
import UserProfile from "./components/userProfile/Profile"
import EditProfile from "./components/editProfile/EditProfile"
import AdiminLogin  from "./pages/Admin/adminLogin/AdiminLogin"
import AdminHome from "./pages/Admin/adminHome/AdminHome"
import Dashboard from "./pages/Admin/adminDashboard/Dashboard"
import AddUser from "./pages/Admin/adminAddUser/AddUser.jsx"
import {UserProtect,UserLoginProtect} from "./protectRoute/UserProtect.jsx"
import { AdminLoginProtect,AdminProtect } from "./protectRoute/AdminProtect"
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';  

import './App.css'

function App() { 


  return (
   
    <Router>
         <Routes>
              <Route path="/signup" element={<Singup/>} />

              <Route 
              path="/login" 
              element={
               <UserLoginProtect> 
                 <Login/>
               </UserLoginProtect> 
              } />

             <Route path="/" element={<UserLoginProtect><Login/></UserLoginProtect>} /> 


                      <Route 
                      path="/home" 
                      element={
                        <UserProtect>
                          <Home/>
                        </UserProtect>
                      } />


              <Route 
              path="/profile" 
              element={
                <UserProtect>
                  <UserProfile/>
                </UserProtect>
              } />

              <Route 
              path="/edit" 
              element={
                <UserProtect>
                  <EditProfile/>
                 </UserProtect>
              } />
            

                {/* Admin Routes */}

               <Route 
               path="/admin/login" 
               element={
               <AdminLoginProtect>
                 <AdiminLogin/>
               </AdminLoginProtect>
               }/>

                <Route 
                path="/admin/home" 
                element={
                  <AdminProtect>
                    <AdminHome/>
                   </AdminProtect> 
                }
                />
               <Route 
                path='/admin/dashboard'
                element={
                 <AdminProtect>
                   <Dashboard/>
                 </AdminProtect>
                }
                />
               <Route 
                path='/admin/addUser'
                element={
                 <AdminProtect>
                   <AddUser/>
                 </AdminProtect>
                }
                />
         
         </Routes>
         <ToastContainer/>
    </Router>


  )
}

export default App
