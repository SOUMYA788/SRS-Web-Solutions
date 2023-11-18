import mongoose from 'mongoose'
let isConnected = false;
const dbConnection = async () => {
    mongoose.set("strictQuery", true)
    console.log("Starting Connection Process");
    if (isConnected) {
        console.log("MongoDB is Connected");
        return
    }
    try {
        console.log("mongo uri", process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("MongoDB is Connected");
        return
    } catch (error) {
        console.log(error);
    }

}

export default dbConnection

// This is correct, matched 5 times