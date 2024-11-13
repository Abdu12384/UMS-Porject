const User = require('../models/userModel')
const bcrypt = require('bcrypt')



const showUser = async (req,res)=>{
  try {
    const users = await User.find({is_Admin:false})
    if(!users || users.length ===0){
      res.status(404).json({message:'No user found'})
    }
      return res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({message:'Server error'})
  }
}

const getHome = async(req,res)=>{
    try {
      res.status(200).send({message:'Welcom to Admin Home'})
    } catch (error) {
      res.status(500).send({message:'Error retriving admin home'})
      
    }
}



const editUser = async (req,res) =>{
     const {id} = req.params;
     const {name, email, mobile}= req.body

     try {
       const updateUser = await User.findByIdAndUpdate(
        id,
        {name, email, mobile}      
      )

      if(!updateUser){
       return res.status(404).json({error:'User not found'})
      }
      res.json({message:'User update successfully'})
     } catch (error) {
      console.error('Error updating user',error)
      res.status(500).json({error:'Error upadating user'})
     }
}

const deleteUser = async(req,res)=>{
  try {
    const userId = req.params.id
    await User.findByIdAndDelete(userId)
    res.status(200).json({message:'User delete successfully'})
  } catch (error) {
    res.status(500).send({message:'Error deleting user', error})
  }
}



const AddUser = async (req, res)=>{
     const {name,email,mobile,password} = req.body
    
     try {
          
      const existingUser = await User.findOne({email})
       if(existingUser){
          return res.status(400).json({message:'User already exists with this email'})
       }

       const hasedPassword = await bcrypt.hash(password,10)
       const newUser = new User({
          name,
          email,
          mobile,
          password:hasedPassword
       })
       await newUser.save()
       res.status(200).json({message:'User added successfullyy'})
     } catch (error) {
       res.status(500).json({error:'Error adding user'})
     }


}

 const  logoutLoad = async (req, res)=>{
     res.clearCookie('adminToken',{
       httpOnly:true,
       secure: false,
       sameSite:'Lax'
     })
     return res.status(200).json({message:'Logout successfully'})
 }


module.exports={
   showUser,
   editUser,
   getHome,
   deleteUser,
   AddUser,
   logoutLoad
}