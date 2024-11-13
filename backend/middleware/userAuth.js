const jwt = require('jsonwebtoken');


const securtyKey = process.env.JWT_SECRET_KEY;

const authenticaetUser = (req, res, next)=>{
   const token = req.cookies.userToken
    console.log('sdfsdfdsfsfdf',token);
    

   if(!token){
     return res.status(401).json({message:'Access Denied'})

   }
    
   try {
     const decoded = jwt.verify(token,securtyKey)
     
    req.user={id: decoded.userId}
      next()

   } catch (error) {
    console.error('invalid token:',error)
    res.status(400).json({message:'Invalid token'})
   }

}

module.exports={
  authenticaetUser
}