const { v4: uuidv4 } = require('uuid');
const HttpError= require('../models/http-error')
const {validationResult}= require('express-validator')
const User= require('../models/user')
const Meal= require('../models/meal')
const bcrypt= require('bcryptjs')
const jwt=require('jsonwebtoken')


const getUsers=async(req,res,next)=>{
    let users;
    try {
        users=await User.find({}, '-password')
    } catch (err) {
        const error= new HttpError('fetching users failed',500)
        return next(error)
    }
    res.status(200).json({user:users.map(user=>user.toObject({getters:true}))})
}

const signup=async(req,res,next)=>{
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return next(new HttpError('invalid input',422))
    }
    const {name, email,password}=req.body

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

    let hashPassword;
    try {
        hashPassword= await bcrypt.hash(password,12)
    } catch (err) {
        const error= new HttpError('Could not create a hashPassword' ,500)
        return next(error)
    }
    
    const createdUser=new User({
        name,
        email,
        password:hashPassword,
        image:req.file.path,
        meals:[]
    })
    try {
        await createdUser.save()
    } catch (err) {
        const error= new HttpError('can not create a user',500)
        return next(error)
    }

    let token;
    try {
        token= jwt.sign({userId:createdUser.id, email:createdUser.email},process.env.JWT_KEY,{expiresIn:'1h'})
    } catch (err) {
        const error= new HttpError('sign up failed',500)
        return next(error) 
    }
    

    res.status(201).json({userId:createdUser.id, email:createdUser.email,image:createdUser.image,token})
}


const login=async(req,res,next)=>{
    const {email,password}=req.body

    let existingUser;
    try {
        existingUser=await User.findOne({email:email})
    } catch (err) {
        const error= new HttpError('log in failed',500)
        return next(error)
    }

    if(!existingUser){
        const error= new HttpError('could not find the user, can not log you in ',401)
        return next(error)
    }

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
    

    res.json({userId:existingUser.id, email:existingUser.email,image:existingUser.image,token})
}



exports.getUsers= getUsers
exports.signup=signup
exports.login=login