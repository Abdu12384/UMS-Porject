const express = require('express')
const auth_Route= express.Router()


const authController = require('../controllers/authController')

auth_Route.post('/signup',authController.inserUser)
auth_Route.post('/login',authController.userVarify)


module.exports=auth_Route