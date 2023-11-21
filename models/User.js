import {Schema, model, models } from "mongoose"

const UserSchema = new Schema({
    userName:{
        type:String,
        require: [true, "Invalid Username"]
    },
    userEmail: {
        type:String, 
        require:[true, "Invalid Email ID"],
        unique:true,
    },
    userPhone:{
        type:String,
        require: [true, "Invalid Phone Number"]
    },
    userPassword: {
        type:String, 
        require:[true, "Password is Require"]
    },
    role:{
        type:String,
        default:"user"
    }
}, {timestamps:true})

const UserModel = models.UserModel || model("UserModel", UserSchema)
export default UserModel;