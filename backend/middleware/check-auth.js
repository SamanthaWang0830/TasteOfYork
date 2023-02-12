const HttpError= require('../models/http-error')
const jwt= require('jsonwebtoken')


module.exports=(req,res,next)=>{
    if(req.method==='OPTIONS'){
        return next()
    }
    
    try {
        const token= req.headers.authorization.split(' ')[1]  //Authorization:'Bearer Token'
        if(!token){
            throw new HttpError('authentication failed ',401)
        }
        const decodeToken= jwt.verify(token, process.env.JWT_KEY)
        req.userData={userId:decodeToken.userId}
        next()
    } catch (err) {
         const error= new HttpError('authentication failed ',401)
         return next(error)
    }
   
    
}
