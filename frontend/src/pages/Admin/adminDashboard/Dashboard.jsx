import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import 'font-awesome/css/font-awesome.min.css';
import { Navigate, useNavigate } from 'react-router-dom'
import EditUser from '../EditDeleteUser/EditUser'
import {  toast } from 'react-toastify';  
import '../../../assets/styles/Dashboard.scss'
function Dashboard() {
  const [users, setUsers]= useState([])
   const [editUser, setEditUser] = useState(null)
   const [filteredUsers, setFilteredUsers] = useState([]) // To store filtered users for search
   const [message , setMessage] = useState('')
   const [confirmDelete, setConfirmDelete] = useState(null);  
   const [searchTerm, setSearchTerm] = useState('')  // State for storing the search term

   const navigate = useNavigate()
   //Get AdminStatus From Redux
   const isLoggedIn = useSelector((state)=>state.admin.AdminLoggedIn)
 
      
    useEffect(() =>{
        const fetchUsers = async ()=>{
          try {
           
              const response = await axios.get('http://localhost:3000/admin/dashboard',{
                   withCredentials:true
                })         
                
                setUsers(response.data)
                setFilteredUsers(response.data)
            } catch (error) {
              console.error('Error fetching users:',error)
              setLoading(false)
            }
        }
        fetchUsers()
    },[])
      
    useEffect(() => {
      if (searchTerm.trim() === '') {
        setFilteredUsers(users); // If search is empty, show all users
      } else {
        setFilteredUsers(
          users.filter((user) =>
            user.name.toLowerCase().startsWith(searchTerm.toLowerCase())
          )
        );
      }
    }, [searchTerm, users]); // This will trigger whenever the searchTerm or users list changes
  

     
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


     const handleEdit = (userId) =>{
       
       const userToEdit = users.find((user)=>user._id === userId)
        setEditUser(userToEdit)
     }


    
     const handleSave = (updatedUser) => {
          setUsers((prevUsers)=>
            prevUsers.map((user)=>(user._id === updatedUser._id ? updatedUser : user))
        )
        setEditUser(null)
     }


     const handleCancel = () =>{
      setEditUser(null)
     }

      //Delete User

     const handleDelete = async (userId) =>{
      try {
       const response = await axios.delete(`http://localhost:3000/admin/deleteUser/${userId}`,{
            withCredentials:true
       })

       toast.success('User deleted successfully!', { position: 'top-right' });
       setUsers((prevUser) => prevUser.filter((user)=> user._id !== userId))
       setFilteredUsers((prevUser) => prevUser.filter((user)=> user._id !== userId))
       setConfirmDelete(null)
      } catch (error) {
        console.error('Error deleting user:',error)
      }
     }



  if(!isLoggedIn){
    return <Navigate to='/admin/login' replace/>
  }

  return (
    <div className="dashboard-container">
      {!editUser && <h2>Admin Dashboard</h2>}
      {!editUser && (
        <div className="dashboard-actions">
          <button className="btn btn-primary" onClick={() => navigate('/admin/home')}>Back To Home</button>
          <button className="btn btn-success" onClick={() => navigate('/admin/addUser')}>Add User +</button>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search users by name..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
            <button onClick={handleSearch} className="btn btn-search">Search</button>
          </div>
        </div>
        
      )}

      {message && <h3 className="success-message">{message}</h3>}

      {editUser ? (
        <EditUser user={editUser} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <div className="table-container">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>
                    <img src={ user?.profileImage ? `http://localhost:3000${user.profileImage}` : '/src/assets/dummy.jpg'} alt={user.name} className="user-image" />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td className="action-buttons">
                    <button className="btn btn-edit" onClick={() => handleEdit(user._id)}>Edit</button>
                    <button className="btn btn-delete" onClick={() => setConfirmDelete(user._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmDelete && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure you want to delete this user?</h3>
            <div className="modal-buttons">
              <button
                className="btn btn-confirm"
                onClick={() => handleDelete(confirmDelete)}  // Confirm delete
              >
               Delete
              </button>
              <button className="btn btn-cancel" onClick={() => setConfirmDelete(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
