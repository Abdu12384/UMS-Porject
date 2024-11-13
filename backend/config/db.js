const mongoose = require('mongoose')
const dotenv = require ('dotenv')

dotenv.config()



const connectDB = async ()=> {
  
  try {
      await mongoose.connect(process.env.MONGODB_URI)
      console.log("MongoDB connected successfully");
      
    } catch (error) {
      console.error("MongonDB connection error789:" ,error)
      process.exit()
    }
}

module.exports = connectDB