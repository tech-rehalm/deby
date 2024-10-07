import mongoose from "mongoose"

const houseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    taken:{
        type:Boolean,
        required:true,
        default:false
    },
    number:{
        type:Number,
        required:true
    },
    field:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
})

const House = mongoose.models?.House || mongoose.model("House", houseSchema)
export default House