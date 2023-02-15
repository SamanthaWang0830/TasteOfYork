const HttpError= require('../models/http-error')
const { v4: uuidv4 } = require('uuid');
const {validationResult}= require('express-validator')
const Meal= require('../models/meal')
const User= require('../models/user');
const mongoose= require('mongoose')
const fs= require('fs')

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
const deleteFile=(fileName)=> {
    const deleteParams = {
      Bucket: bucketName,
      Key: fileName,
    }
  
    return s3Client.send(new DeleteObjectCommand(deleteParams));
}
//


const getMealById=async(req,res,next)=>{
    const mealId= req.params.mid 
    let meal
    try {
        meal=await Meal.findById(mealId)
    } catch (err) {
        const error= new HttpError('finding meal failed',500)
        return next(error)
    }
    if(!meal){
        const error=  new HttpError('could not find the meal',404)
        return next(error)
    }
    res.json({meal:meal.toObject({getters:true})})
}

const getAllMeals=async(req,res,next)=>{
    let meals;
    try {
        meals= await Meal.find()
    } catch (err) {
        const error= new HttpError('could not find meals', 500)
        return next(error)
    }
    for (let meal of meals) {
        meal.image = await getObjectSignedUrl(meal.image)
    }
    res.json({meals: meals.map(meal=>meal.toObject({getters:true}))})
}

const getMealsByUserId=async(req,res,next)=>{
    const userId= req.params.uid 
    let userWithMeals
    try {
        //places=await Place.find({creator:userId})
        userWithMeals= await User.findById(userId).populate('meals')
    } catch (err) {
        const error= new HttpError('could not find the meals by userId', 500)
        return next(error)
    }
    if(!userWithMeals || userWithMeals.meals.length==0){
        return next(new HttpError('could not find the user',404))
    }

    //把meal.image改成url
    for (let meal of userWithMeals.meals) {
        meal.image = await getObjectSignedUrl(meal.image)
    }
    //
    
    //返回的是一个array 所以要用map
    res.json({meals:userWithMeals.meals.map(meal=>meal.toObject({getters:true}))})
}

const createMeal=async(req,res,next)=>{
    //已经出现的错误
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        console.log(errors)
        throw new HttpError('invalid input',422)
    }


    const {name,description}=req.body
    //建新的meal
    const file=req.file
    const imageName = generateFileName()
    await uploadFile(file.buffer,imageName,file.mimetype)

    const createdMeal = new Meal({
        name,
        description,
        image:imageName,
        creator:req.userData.userId
    })
    //看看这个user存不存在
    let user;
    try {
        user=await User.findById(req.userData.userId)
    } catch (err) {
        const error= new HttpError('creating meal failed',500)
        return next(error)
    }
    if(!user){
        const error= new HttpError('can not find this user',500)
        return next(error)
    }

    //1. if create the meal fail, 2. if store the created mealId add into the user fail
    // either one operation fail, then undo all operaions
    try {
        const sess= await mongoose.startSession()
        sess.startTransaction()
        //1. save the the created meal
        await createdMeal.save({session:sess})
        //2. store the created mealId add into the user, add the connection between the meal and user
        user.meals.push(createdMeal)
        await user.save({session:sess})
        await sess.commitTransaction()
        //until this time the process succeed
    } catch (err) {
        const error= new HttpError('creating meal failed in the final step',500)
        return next(error)
    }
        
    res.status(201).json({meal:createdMeal})
}

const updateMealById=async(req,res,next)=>{
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return next(new HttpError('invalid input',422))
    }
    const {name,description}=req.body
    const mealId= req.params.mid

    //建了一个这个meal的copy
    let meal;
    try {
        meal=await Meal.findById(mealId)
    } catch (err) {
        const  error= new HttpError('something wrong can not find the meal',500)
        return next(error)
    }

    //req.userData  was added on the above middleware 'check-auth'
    if(meal.creator.toString() !== req.userData.userId){
        const  error= new HttpError('You are not allowed to edit this place',401)
        return next(error)
    }

    meal.name=name
    meal.description=description

    try {
        await meal.save()
    } catch (err) {
        const  error= new HttpError('something wrong can not update the meal',500)
        return next(error)
    }
    res.status(200).json({meal:meal.toObject({getters:true})})
}


const deleteMealById=async(req,res,next)=>{
    const mealId= req.params.mid 
    let meal;
    try {
        meal= await Meal.findById(mealId).populate('creator')
    } catch (err) {
        const  error= new HttpError('something wrong can not find the meal',500)
        return next(error)
    }

    if(!meal){
        const  error= new HttpError('can not find the meal by Id',404)
        return next(error)
    }

    if(meal.creator.id !== req.userData.userId){
        const  error= new HttpError('You are not allowed to edit this place',401)
        return next(error)
    }

    const imagePath=meal.image

    try {
        const sess=await mongoose.startSession()
        sess.startTransaction()
        await meal.remove({session:sess})
        meal.creator.meals.pull(meal)
        await meal.creator.save({session:sess})
        await sess.commitTransaction()
    } catch (err) {
        const  error= new HttpError('can not delete the meal in the final step',500)
        return next(error)
    }

    //删除掉在aws中的图片
    await deleteFile(meal.image)
    //

    fs.unlink(imagePath,err=>console.log(err))

    res.status(200).json({message:'deleted'})
}


const likePost=async(req,res,next)=>{
    const mealId= req.params.mid 
    let meal;
    try {
        meal= await Meal.findById(mealId)
    } catch (err) {
        const  error= new HttpError('something wrong can not find the meal',500)
        return next(error)
    }
    let updatedMeal
    try {
        updatedMeal= await Meal.findByIdAndUpdate(mealId,{likeCount:meal.likeCount+1},{new:true})
    } catch (err) {
        const  error= new HttpError('can not like the meal',500)
        return next(error)
    }
    res.status(200).json(updatedMeal)
}
const dislikePost=async(req,res,next)=>{
    const mealId= req.params.mid 
    let meal;
    try {
        meal= await Meal.findById(mealId)
    } catch (err) {
        const  error= new HttpError('something wrong can not find the meal',500)
        return next(error)
    }
    let updatedMeal
    try {
        updatedMeal= await Meal.findByIdAndUpdate(mealId,{dislikeCount:meal.dislikeCount+1},{new:true})
    } catch (err) {
        const  error= new HttpError('can not dislike the meal',500)
        return next(error)
    }
    res.status(200).json(updatedMeal)
}




exports.getMealById=getMealById
exports.getMealsByUserId=getMealsByUserId
exports.createMeal=createMeal
exports.updateMealById=updateMealById
exports.deleteMealById=deleteMealById
exports.likePost=likePost
exports.dislikePost=dislikePost
exports.getAllMeals=getAllMeals