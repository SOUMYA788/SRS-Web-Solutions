"use server"

import OrderModel from "@/models/orders.model";

export const updateUserOrder = async (formData) => {

    try {
        const orderId = formData.get("orderId");
        const orderPrice = formData.get("orderPrice");
        const orderStatus = formData.get("orderStatus");
        const deliverWithin = formData.get("deliverWithin");
        const orderDeliveredDate = formData.get("orderDeliveredDate");

        const hasIncorrectInfo = (!parseInt(orderPrice)) || (!["pending", "delivered", "cancelled"].includes(orderStatus.toLowerCase())) || (!regex.test(deliverWithin)) || (!orderDeliveredDate.includes("-") || orderDeliveredDate.includes("()"))

        // if wrong data provided, then return with error...
        if (hasIncorrectInfo) {
            throw new Error("Credentials may be invalid");
        }

        const rawFormData = {
            orderPrice: parseInt(orderPrice),
            orderDelivered: orderDeliveredDate ? true : false,
            orderStatus, deliverWithin, orderDeliveredDate
        }

        if (orderId) {
            const updatedOrder = await OrderModel.findByIdAndUpdate({ _id: orderId }, rawFormData);

            // we will proceed if email is not exist in database...
            if (!updatedOrder) {
                throw new Error("Faild to update order")
            }

            return JSON.stringify({
                success: true,
                message: "Order Updated Succesfully"
            })

        } else {
            const newOrder = new OrderModel(rawFormData)
            const savedOrder = await newOrder.save();

            if (!savedOrder) {
                throw new Error("Faild to save the new order")
            }

            return JSON.stringify({
                success: true,
                message: "Order Added Succesfully"
            })
        }
    } catch (error) {
        console.log("⚠⚠ ERROR FROM ACTION UPDATE_ORDER ⚠⚠", error.message);
    }
}