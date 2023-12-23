import dbConnection from "@/middleware/dbConnection";
import OrderModel from "@/models/orders.model";
import { varifyUserOrder } from "@/utils/varifyUserOrder";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const { orderPrice, orderStatus, deliverWithin, orderDeliveredDate, loginSecret } = await req.json();
    try {

        // invalid loginSecret means unauthorised person - e.g. Hacker...
        if (loginSecret !== process.env.LOGIN_SECRET) {
            console.log("LOGIN_SECRET", loginSecret, process.env.LOGIN_SECRET);
            throw new Error("You are not authorised person from add route");
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

        const newOrder = new OrderModel(rawFormData)
        const savedOrder = await newOrder.save();

        if (!savedOrder) {
            return NextResponse.json({
                success: false,
                message: "Faild to save the data",
            }, { status: 400 })
        }

        return NextResponse.json({
            success: true,
            message: "Order Added Succesfully",
        }, { status: 200 })


    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}