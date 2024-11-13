const mongoose = require('mongoose')
const { type } = require('os')

const userSchema = new mongoose.Schema({
     
      name:{
        type:String,
        required:true,
      },
      email:{
        type:String,
        required:true,
        unique:true
      },
      password:{
         type:String,
         required:true
      },
      mobile:{
        type:String,
        required:true
      },
      is_Admin:{
        type:Boolean,
         required:true,
         default:false
      },
      profileImage:{
        type:String,
        default:'',
      }

    
});

module.exports= mongoose.model('Users',userSchema)