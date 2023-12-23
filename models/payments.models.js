import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    paymentId: {
        type: String,
        require: [true, "Payment ID is Require"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel"
    },
    orderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"OrderModel"
    },
    paidAmount: {
        type: String,
        require: [true, "Paid Amount is Require"],
    },
    paymentStatus:{
        type: String,
        require: [true, "Paid Amount is Require"],
        enum:["PAID", "UNPAID"]
    },
    paymentLastDate:{
        type:String,
        require:true
    }
    
}, { timestamps: true });

mongoose.models = {};

const PaymentModel = mongoose.model("PaymentModel", paymentSchema);

export default PaymentModel