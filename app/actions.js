"use server"

import OrderModel from "@/models/orders.model";

export const updateUserOrder = async (prevState, formData) => {

    try {
        const orderId = formData.get("orderId");
        const orderPrice = formData.get("orderPrice");
        const orderStatus = formData.get("orderStatus");
        const deliverWithin = formData.get("deliverWithin");
        const orderDeliveredDate = formData.get("orderDeliveredDate");

        const regex = /^[0-9]+\s[a-z]+/i

        if ((!orderId && !parseInt(orderPrice)) || (orderId && orderPrice && !parseInt(orderPrice))) {
            throw new Error("Invalid Order Price")
        }

        if ((!orderId && !["pending", "delivered", "cancelled"].includes(orderStatus.toLowerCase())) ||
            (orderId && orderStatus && !["pending", "delivered", "cancelled"].includes(orderStatus.toLowerCase()))) {
            throw new Error("Invalid Status")
        }
        
        if((!orderId && !regex.test(deliverWithin)) || (orderId && deliverWithin && !regex.test(deliverWithin))){
            throw new Error("Invalid Date")
        }
        
        if((!orderId && (!orderDeliveredDate.includes("-") || orderDeliveredDate.includes("()"))) || orderId && orderDeliveredDate && (!orderDeliveredDate.includes("-") || orderDeliveredDate.includes("()"))){
            throw new Error("Invalid Delivery Date")
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

            return {
                message: `Order ID: ${updatedOrder?._id?.toString()} Updated`
            }

        } else {
            const newOrder = new OrderModel(rawFormData)
            const savedOrder = await newOrder.save();

            if (!savedOrder) {
                throw new Error("Faild to save the new order")
            }

            return {
                message: `Order ID: ${newOrder?._id?.toString()} Added`
            }
        }
    } catch (error) {
        console.log("\n\n⚠⚠ ERROR FROM ACTION UPDATE_ORDER ⚠⚠\n", error.message, "\n\n");
        return {
            message: error.message
        }
    }
}