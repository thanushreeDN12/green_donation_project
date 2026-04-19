import express from 'express'
import cors from 'cors'
import bodyparser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authenticationRoutes from './routes/authentication.js'
import programRoutes from './routes/programs.js'
import usersRoutes from './routes/users.js'
import adminRoutes from './routes/adminRoutes.js'

dotenv.config()

// connecting to express
const app= express()

// using middlewares
app.use(bodyparser.json({ limit:"32mb", "extended": true}))
app.use(bodyparser.urlencoded({ limit:"32mb", "extended": true}))
app.use(express.json({ limit: "32mb" }));
app.use(express.urlencoded({ limit: "32mb", extended: true }));

app.use(cors())


// routes
app.use('/authentication', authenticationRoutes )
app.use('/programs',programRoutes)
app.use('/users', usersRoutes)
app.use('/admin',adminRoutes)

app.get('/', (req, res) => {
    res.send("welcome to the greenroots api");
})


// connecting to DB
const MONGO_URI= process.env.MONGO_URI
const PORT= process.env.PORT || 5005

const connectDB= async () =>{
    try{
       await mongoose.connect(MONGO_URI)
       app.listen(PORT, () =>{console.log(`Server is running on port ${PORT}`)})
    } catch(err){
        console.log("Connection to MongoDB failed ", err.message)
    }
}

connectDB()

mongoose.connection.on("open", ()=> console.log("Connection to database is established successfully"))
mongoose.connection.on("error", (err)=> console.log(err))

