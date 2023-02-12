const express= require('express')
const bodyParser=require('body-parser')
const HttpError= require('./models/http-error')
const mealsRoutes= require('./routes/meals-route')
const usersRoutes=require('./routes/users-route')
const app=express()
const fs= require('fs')
const mongoose= require('mongoose')
const path = require('path')
//middleware
app.use(bodyParser.json())

app.use('/uploads/images',express.static(path.join('uploads','images')))

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','Origin, X-requested-With, Content-Type,Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods','GET,POST, PATCH,DELETE')
    next()
})

app.use('/api/meals',mealsRoutes)
app.use('/api/users',usersRoutes)


app.use((req,res,next)=>{
    const error= new HttpError('could not find this route',404)
    throw error
})

// error handling middleware, if former part trigger it , throw/next
app.use((error,req,res,next)=>{
    if(req.file){
        fs.unlink(req.file.path, (err)=>{
            console.log(err)
        })
    }
    if(res.headerSent){
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message:error.message || 'an unknown error'})
})


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.4pj8ua1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`).then(()=>{
    app.listen(prcess.env.PORT || 7000)
}).catch(err=>{
    console.log(err)
})
