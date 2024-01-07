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
        required: true,
        default: "pending",
    },
    paymentStatus: {
        type: String,
        required: true,
        default: "unpaid",
        enum: ["paid", "unpaid"]
    },
    paymentDateTime: {
        type: String,
        default: "undefined"
    },
    orderDeliveredDate: {
        type: String,
        default: "",
    }
}, { timestamps: true })


mongoose.models = {};

const OrderModel = mongoose.model("OrderModel", ordersSchema);
// const OrderModel = mongoose?.models?.OrderModel || mongoose.model("OrderModel", ordersSchema);

export default OrderModel

