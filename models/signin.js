import {Schema, model, models } from "mongoose"

const SignInSchema = new Schema({
    // change this
    userEmail: {
        type:String, 
        require:[true, "Email is Require"]
    },
    userMessage: {
        type:String, 
        require:[true, "Message is Require"]
    }
}, {timestamps:true})

const SignInModel = models.SignInModel || model("SignInModel", SignInSchema)
export default SignInModel;