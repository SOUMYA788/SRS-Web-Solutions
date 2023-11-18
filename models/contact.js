import {Schema, model, models } from "mongoose"

const ContactSchema = new Schema({
    userEmail: {
        type:String, 
        require:[true, "Email is Require"]
    },
    userMessage: {
        type:String, 
        require:[true, "Message is Require"]
    }
}, {timestamps:true})

const ContactModel = models.ContactModel || model("ContactModel", ContactSchema)
export default ContactModel;
