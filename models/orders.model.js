import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel"
    },
    orderPrice: {
        type: Number,
        default: 0
    },
    orderStatus: {
        type: String,
        required:true,
        default:"pending",
    },
    deliverWithin:{
        type: String,
        required:true
    },
    orderDelivered: {
        type: Boolean,
        default: false,
    },
    orderDeliveredTime: {
        type: String,
        default: "",
    }
}, { timestamps: true })

mongoose.models = {};

const OrderModel = mongoose.model("OrderModel", ordersSchema);

export default OrderModel