import {Schema, model, models } from "mongoose"

const LoginSchema = new Schema({
    userEmail: {
        type:String, 
        require:[true, "Email is Require"]
    },
    userPassword: {
        type:String, 
        require:[true, "Password is Require"]
    }
}, {timestamps:true})

const LoginModel = models.LoginModel || model("LoginModel", LoginSchema)
export default LoginModel;
