const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const path = require('path')
const cookieParser = require('cookie-parser')
const nocache = require('nocache')

dotenv.config()
const app= express()

app.use(nocache())


app.use(cookieParser())

app.use(cors({
 origin:'http://localhost:5173',
 credentials:true
}))

app.use(express.json());
app.use(express.json())

connectDB();


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




app.get('/',(req,res)=>{
  res.send("MongoDb is connnected")
})

// Authntication only
const authRoute= require('./routes/authRoute')
const userRoute = require('./routes/userRoutes')
const adminRoute = require('./routes/adminRoute')



app.use('/auth',authRoute)
 app.use('/user',userRoute)
 app.use('/admin',adminRoute)

 

const PORT = 3000;
 app.listen(PORT,()=>console.log(`Server is Running on http://localhost:${PORT}`));