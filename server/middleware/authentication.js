import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authentication= async (req, res, next) =>{
    try{
        const token = req.headers.authorization?.split(' ')[1];// returns secret key

        if(!process.env.JWT_SECRET){
            throw new Error('JWT_SECRET must be set in the environment')
        }

        if(token){
            let decodedData= jwt.verify(token, process.env.JWT_SECRET)
            req.userid= decodedData?.id  //id is id of logged in user
            //populate req with id for subsequent middlewares to make use
        }
        next() //calling further middlewares
    }catch(err){
        console.log(err)
    }
}

export default authentication
