import mongoose from 'mongoose'
let isConnected = false;
const dbConnection = async () => {
    mongoose.set("strictQuery", true)
    console.log("Starting Connection Process");
    if (isConnected) {
        console.log("MongoDB is already Connected");
        return
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("MongoDB is Connected Now");
        return
    } catch (error) {
        console.log(error);
    }
}

export default dbConnection

// This is correct, matched 5 times