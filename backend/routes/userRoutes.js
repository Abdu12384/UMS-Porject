const express = require('express')
const user_Router = express.Router()
const multer = require('multer')
const path = require('path')

const userController = require('../controllers/userController')
const userAuth = require('../middleware/userAuth')


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
    cb(null, 'uploads');
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now()+'-'+file.originalname)
  }
})
const upload = multer({ storage:storage})

user_Router.get('/profile',userController.userProfile)
user_Router.put('/update/:id',userAuth.authenticaetUser,upload.single('profileImage'),userController.updateProfile)
user_Router.post('/logout',userController.logoutUser)


module.exports = user_Router