import mongoose,{Schema, model, models } from "mongoose"

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
    userProfilePicture:{
        type:String
    },
    userProfileColor:{
        type:String
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
    },
    orders:{
        type:Array,
        default:[]
    }
}, {timestamps:true})
console.log("models is the right side", models);
mongoose.models = {}
const UserModel = model("UserModel", UserSchema)
export default UserModel;