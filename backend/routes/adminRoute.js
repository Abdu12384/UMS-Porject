const express = require('express')
const admin_Route = express.Router()



const adminAuth= require('../middleware/adminAuth')
const adminController = require('../controllers/adminController')



admin_Route.post('/login', adminAuth.adminAuth)
admin_Route.get('/home',adminAuth.adminVarify,adminController.getHome)
admin_Route.get('/dashboard',adminAuth.adminVarify,adminController.showUser)
admin_Route.put('/edit/:id',adminAuth.adminVarify,adminController.editUser)
admin_Route.delete('/deleteUser/:id',adminController.deleteUser)
admin_Route.post('/addUser',adminAuth.adminVarify,adminController.AddUser)
admin_Route.post('/logout',adminController.logoutLoad)

module.exports=admin_Route


