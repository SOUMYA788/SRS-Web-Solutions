import dbConnection from "@/middleware/dbConnection";
import OrderModel from "@/models/orders.model";
import { varifyUserOrder } from "@/utils/varifyUserOrder";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const {orderId, orderPrice, orderStatus, deliverWithin, orderDeliveredDate, loginSecret } = req.json();
    try {

        // invalid loginSecret means unauthorised person - e.g. Hacker...
        if (loginSecret !== process.env.LOGIN_SECRET) {
            return NextResponse.json({
                success: false,
                message: "You are not authorised person update route",
            }, { status: 400 })
        }

        // re-varify user order information.
        const rawFormData = varifyUserOrder(orderPrice, orderStatus, deliverWithin, orderDeliveredDate);

        if(!rawFormData){
            return NextResponse.json({
                success: false,
                message: "Invalid Order Data",
            }, { status: 400 })
        }


        // Data ready to upload server, let's connect with database...
        await dbConnection()

        const updatedOrder = await OrderModel.findByIdAndUpdate({_id: orderId}, rawFormData);

        if (!updatedOrder) {
            return NextResponse.json({
                success: false,
                message: "Faild to save the data",
            }, { status: 400 })
        }

        return NextResponse.json({
            success: true,
            message: "Order Updated Succesfully"
        }, { status: 200 })


    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            error: JSON.parse(error.message)
        }, { status: 500 })
    }
}