import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs' //hash pw
import User from '../models/users.js'
import Admin from '../models/admin.js'

dotenv.config()

const getJwtConfig = () => {
    const { JWT_SECRET, JWT_EXPIRES_IN } = process.env

    if (!JWT_SECRET || !JWT_EXPIRES_IN) {
        throw new Error('JWT_SECRET and JWT_EXPIRES_IN must be set in the environment')
    }

    return { JWT_SECRET, JWT_EXPIRES_IN }
}

const login= async (req, res) => {
    const {username, pw}= req.body

    try{
        const oldUser= await User.findOne({username})

        if( !oldUser){
            return res.status(400).json({message: 'User does not exist'})
        }

        const isPasswordValid= await bcrypt.compare(pw, oldUser.password)
        if(!isPasswordValid){
            return res.status(400).json({message:'Invalid Password'})
        }

        const { JWT_SECRET, JWT_EXPIRES_IN } = getJwtConfig()
        const token= jwt.sign({email: oldUser.email, id:oldUser._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})
        res.status(200).json({result:oldUser, token })

    }catch(err){
        res.status(500).json({message: 'Something went wrong'})
    }
}

const signup= async (req, res) => {
    const {username, email, pw }= req.body
    try{
        const oldUser= await User.findOne({email})
        if(oldUser){
            return res.status(400).json({message:'Email already exists'})
        }

        const encryptedPassword= await bcrypt.hash(pw, 12)
        const newUser= await User.create({username, password:encryptedPassword, email})
        const { JWT_SECRET, JWT_EXPIRES_IN } = getJwtConfig()
        const token= jwt.sign({email: newUser.email, id:newUser._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})
        return res.status(201).json({result: newUser, token})

    }catch(err){
        res.status(500).json({message:'Something went wrong'})
    }
}

const admin= async (req, res) => {
    console.log("inside controller")
    const {username, pw }= req.body
    console.log(username, pw)
    
    try{
        const oldUser= await Admin.findOne({username})
        console.log(oldUser)
        if(!oldUser){
            return res.status(400).json({message:'admin doesnot exists'})
        }

        const isPasswordValid = await bcrypt.compare(pw, oldUser.password)
        if(!isPasswordValid){
            return res.status(400).json({message:'Invalid Password'})
        }

        const { JWT_SECRET, JWT_EXPIRES_IN } = getJwtConfig()
        const token= jwt.sign({username: oldUser.username, id:oldUser._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})
        return res.status(200).json({result: oldUser, token})

    }catch(err){
        res.status(500).json({message:'Something went wrong'})
    }
}



export {login, signup, admin}
