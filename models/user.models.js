import mongoose,{Schema, model, models } from "mongoose"

const UserSchema = new Schema({
    userName:{
        type:String,
        required: [true, "Invalid Username"],
        trim:true
    },
    userEmail: {
        type:String, 
        required:[true, "Invalid Email ID"],
        unique:true,
        trim:true
    },
    userProfilePicture:{
        type:String,
        default:"",
    },
    userProfileBackgroundPicture:{
        type:String,
        default:"",
    },
    userProfileColor:{
        type:String
    },
    userProfileBackgroundColor:{
        type:String
    },
    userPhone:{
        type:String,
        required: [true, "Invalid Phone Number"]
    },
    userPassword: {
        type:String, 
        required:[true, "Password is Require"]
    },
    role:{
        type:String,
        default:"user"
    }
}, {timestamps:true})

mongoose.models = {}
const UserModel = model("UserModel", UserSchema)
export default UserModel;   