const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


const adminAuth = async(req,res)=>{
   const {email, password} = req.body

   
   try {
     const admin = await User.findOne({email})
     if(!admin || !admin.is_Admin){
       return res.status(400).json({message:"Admin not found"})
      }
      
      const isMatch = await bcrypt.compare(password,admin.password)
      if(!isMatch){
        return res.status(400).json({message:"Invalid passwrod"})
      }
     
      
     const token = jwt.sign({
       adminId: admin._id,
       is_Admin:true},
       process.env.JWT_SECRET_KEY,
     {expiresIn:'1d'}
     )
     
      res.cookie('adminToken',token,{
         httpOnly:true,
         secure:false,
          maxAge: 24* 60 * 60 * 1000,
          sameSite:'Lax'
      })

     res.json({admin})
   } catch (error) {
    return res.status(500).json({message: "Server error"})
   }
}


  const adminVarify= async(req,res,next)=>{
      
      const token = req.cookies.adminToken
           
                     
          if(!token){
            return res.status(401).json({message: 'No token Provided. Acced denied'})
          }
        try {
          const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
               
          
          const admin = await User.findById(decoded.adminId)
          console.log(admin);
          
          if(!admin || !admin.is_Admin){
            return res.status(403).json({message:"Access denied: Admins only"})
          }
          req.admin= admin
          console.log('Admin verified:', admin); // 
           next()
        } catch (error) {
          res.status(401).json({message:"invalid tokn"})
        }
  }

module.exports ={
   adminAuth,
   adminVarify
}