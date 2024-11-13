const User = require('../models/userModel')


  const updateProfile = async (req,res)=>{
   
      try {
        
        const {name, email, mobile}= req.body
        const user = await User.findById(req.params.id)
          
          
        if(!user){
          return res.status(404).json({message:'User not found'})
        }
        
        user.name = name || user.name;
        user.email = email || user.email
        user.mobile = mobile || user.mobile;

        if(req.file){
          console.log('updload file',req.file);
          
          user.profileImage = '/uploads/' +  req.file.filename;
          
           
        }

        
        await user.save()
        res.status(200).json({message:'Profile updated successfully',user})
      } catch (error) {
        res.status(500).json({message: error.message})
        
      }
  }

 
   const logoutUser = (req, res) => {
     res.clearCookie('userToken',{
       httpOnly:true,
       secure:false,
       sameSite:'lax'
     })
      res.status(200).json({message:'Logged out successfully'})
   }




const userProfile = async (req,res)=>{
   try {
    const user = await User.findById(req.user.id).select('-password')
    
     
     if(!user){
       return res.status(404).json({message:'User not fond'})
     }
      
     res.status(200).json({user})
      
   } catch (error) {
    res.status(500).json({ message:'Sever error'})
    
   }
}









module.exports={
  updateProfile,
  userProfile,
  logoutUser
} 

