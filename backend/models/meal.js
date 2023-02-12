const mongoose= require('mongoose')

const Schema= mongoose.Schema

const mealSchema= new Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    image:{type:String, required:true},
    creator:{type:mongoose.Types.ObjectId, required:true, ref:"User"},
    likeCount: {
        type: Number,
        default: 0,
    },
    dislikeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

module.exports= mongoose.model('Meal',mealSchema)