const { v4: uuidv4 } = require('uuid');
const HttpError= require('../models/http-error')
const {validationResult}= require('express-validator')
const User= require('../models/user')
const bcrypt= require('bcryptjs')
const jwt=require('jsonwebtoken')

//改
const crypto= require('crypto')
const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } =require("@aws-sdk/client-s3")
const { getSignedUrl }= require("@aws-sdk/s3-request-presigner")
require('dotenv').config()

const bucketName = process.env.BUCKET_NAME
const region = process.env.BUCKET_REGION
const accessKeyId = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY


const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
})

const uploadFile=(fileBuffer, fileName, mimetype) =>{
    const uploadParams = {
      Bucket: bucketName,
      Body: fileBuffer,
      Key: fileName,
      ContentType: mimetype
    }
  
    return s3Client.send(new PutObjectCommand(uploadParams));
}

const getObjectSignedUrl=async(key) =>{
    const params = {
      Bucket: bucketName,
      Key: key
    }
  
    const command = new GetObjectCommand(params);
    const seconds = 60
    const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });
  
    return url
}


const getUsers=async(req,res,next)=>{
    let users;
    try {
        users=await User.find({}, '-password')
    } catch (err) {
        const error= new HttpError('fetching users failed',500)
        return next(error)
    }

    for(let user of users){
        user.imageUrl= await getObjectSignedUrl(user.imageName)
    }

    res.status(200).json({user:users.map(user=>user.toObject({getters:true}))})
}

const signup=async(req,res,next)=>{
    //处理已经出现的错误
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return next(new HttpError('invalid input',422))
    }


    const {name, email,password}=req.body
    
    //改:处理图片上传到s3
    const file=req.file
    const imageName = generateFileName()
    await uploadFile(file.buffer,imageName,file.mimetype)
    


    //检查用户是否已经存在
    let existingUser;
    try {
        existingUser=await User.findOne({email:email})
    } catch (err) {
        const error= new HttpError('sign up failed',500)
        return next(error)
    }
    if(existingUser){
        const error= new HttpError('user exists already',500)
        return next(error)
    }

    //编一个假密码
    let hashPassword;
    try {
        hashPassword= await bcrypt.hash(password,12)
    } catch (err) {
        const error= new HttpError('Could not create a hashPassword' ,500)
        return next(error)
    }
    
    //创建一个用户，其中image只用imageName替代
    const createdUser=new User({
        name,
        email,
        password:hashPassword,
        image:imageName,
        meals:[]
    })
    //把这个用户上传到mongodb
    try {
        await createdUser.save()
    } catch (err) {
        const error= new HttpError('can not create a user',500)
        return next(error)
    }

    //生成一个token
    let token;
    try {
        token= jwt.sign({userId:createdUser.id, email:createdUser.email},process.env.JWT_KEY,{expiresIn:'1h'})
    } catch (err) {
        const error= new HttpError('sign up failed',500)
        return next(error) 
    }
    
    //获取在aws中储存的地址
    let imageUrl
    try {
        imageUrl= await getObjectSignedUrl(imageName)
    } catch (err) {
        const error= new HttpError('can not receive the aws address',500)
        return next(error)
    }
    

    res.status(201).json({
        userId:createdUser.id, 
        email:createdUser.email,
        image:imageUrl,
        token
    })
}


const login=async(req,res,next)=>{
    const {email,password}=req.body

    //从mongdb中找到这个user
    let existingUser;
    try {
        existingUser=await User.findOne({email:email})
    } catch (err) {
        const error= new HttpError('log in failed',500)
        return next(error)
    }
    //如果没找到
    if(!existingUser){
        const error= new HttpError('could not find the user, can not log you in ',401)
        return next(error)
    }
    //判断当前密码是否正确
    let isValidPassword= false;
    try {
        isValidPassword= await bcrypt.compare(password,existingUser.password)
    } catch (err) {
        const error= new HttpError('can not log you in ',500)
        return next(error)
    }
    if(!isValidPassword){
        const error= new HttpError('invalid, can not log you in ',401)
        return next(error)
    }

    let token;
    try {
        token= jwt.sign({userId:existingUser.id, email:existingUser.email},process.env.JWT_KEY,{expiresIn:'1h'})
    } catch (err) {
        const error= new HttpError('login failed',500)
        return next(error)
    }
    
    const imageUrl= await getObjectSignedUrl(existingUser.image)
    res.json({
        userId:existingUser.id, 
        email:existingUser.email,
        image:imageUrl,
        token
    })
}



exports.getUsers= getUsers
exports.signup=signup
exports.login=login