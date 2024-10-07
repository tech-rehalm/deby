import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.DB!)
        console.log("Successfullly connected to database");
        
    } catch (error) {
        console.log(error);
    }
}

export default connectDB
