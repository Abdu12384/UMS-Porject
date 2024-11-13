
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




const inserUser = async (req,res)=>{
  
   const{name, email, password,mobile} = req.body
    
    try {
       
      const existingUser = await User.findOne({ email })
     
       if(existingUser){
         return res.status(400).json({ message: 'Email already in use'})
       }

        const hashedPassword = await bcrypt.hash(password,10)

       const user = new User({
        name,
        email,
        password:hashedPassword,
         mobile
        })

       await user.save()

       res.status(201).json({message: 'User rigister successfully'})
    } catch (error) {
      console.error(error)
      res.status(500).json({error:'Server error'})
    }
    

}


const userVarify = async (req,res)=>{
  
  const {email, password}= req.body;
     
       try {
      const user = await User.findOne({email})
        
       if(!user){
         return res.status(400).json({message:'User not found'})
       }
       
         if(user.is_Admin){
           return res.status(403).json({message:'Admins cannot login as users' })
         }
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
          return res.status(400).json({message: "invalid password"})
        }
        
        const token = jwt.sign(
          {userId: user._id, email: user.email},
           process.env.JWT_SECRET_KEY,
           {expiresIn:'1d'}
        )
         
         res.cookie('userToken',token,{
           httpOnly:true,
           secure: false,
           maxAge: 24 * 24 * 60 * 60 * 1000, 
           sameSite: 'lax'  
         })

        res.status(200).json({user})

       } catch (error) {
        console.error(error)
        res.status(500).json({error:'Server error'})
       }
   
}


module.exports={
   inserUser,
   userVarify
}
