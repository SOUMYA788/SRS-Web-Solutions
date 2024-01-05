"use server"

import dbConnection from "@/middleware/dbConnection";
import OrderModel from "@/models/orders.model";


/**
 * 
 * @param {String} userId for user reference in database
 * @param {String} orderId for filter purpose in database
 * @param {Number} orderPrice Order Price Value in Integer
 * @param {String} orderStatus accept only pending || delivered || cancelled
 * @param {String} deliverWithin e.g. 30 Days
 * @param {String} orderDeliveredDate 01-jan-2023
 * @returns {Object} Update or Added Status
 */
export const updateUserOrder = async (userId, orderId, orderPrice, orderStatus, deliverWithin, orderDeliveredDate) => {

    // console.log("Admin ID from form-action updateUserOrder ----", adminId);

    try {
        const regex = /^[0-9]+\s[a-z]+/i

        if ((!orderId && !parseInt(orderPrice)) || (orderId && orderPrice && !parseInt(orderPrice))) {
            throw new Error("Invalid Order Price")
        }

        if ((!orderId && !["pending", "delivered", "cancelled"].includes(orderStatus.toLowerCase())) ||
            (orderId && orderStatus && !["pending", "delivered", "cancelled"].includes(orderStatus.toLowerCase()))) {
            throw new Error("Invalid Status")
        }

        if ((!orderId && !regex.test(deliverWithin)) || (orderId && deliverWithin && !regex.test(deliverWithin))) {
            throw new Error("Invalid Date")
        }

        if ((!orderId && (!orderDeliveredDate.includes("-") || orderDeliveredDate.includes("()"))) || orderId && orderDeliveredDate && (!orderDeliveredDate.includes("-") || orderDeliveredDate.includes("()"))) {
            throw new Error("Invalid Delivery Date")
        }


        const rawFormData = {
            orderPrice: parseInt(orderPrice),
            user: userId || "",
            orderStatus, deliverWithin, orderDeliveredDate
        }

        await dbConnection()

        if (orderId) {

            const updatedOrder = await OrderModel.findByIdAndUpdate(
                { _id: orderId },
                { $set: rawFormData },
                { runValidators: false },
                { new: true }
            );

            // we will proceed if email is not exist in database...
            if (!updatedOrder) {
                throw new Error("Faild to update order")
            }

            // revalidatePath(`/admin/${adminId}/users/${user.toString()}`)

            const updatedOrderArr = await OrderModel.find();

            return JSON.stringify({
                success: true,
                message: "Order Updated Succesfully",
                currentData: updatedOrder,
                allData: updatedOrderArr,
            })

        } else {
            const newOrder = new OrderModel(rawFormData)
            const savedOrder = await newOrder.save();

            if (!savedOrder) {
                throw new Error("Faild to save the new order")
            }

            const updatedOrderArr = await OrderModel.find();

            return JSON.stringify({
                success: true,
                message: "Order Added Succesfully",
                currentData: newOrder,
                allData: updatedOrderArr
            })
        }
    } catch (error) {
        console.log("\n\n⚠⚠ ERROR FROM ACTION UPDATE_ORDER ⚠⚠\n", error.message, "\n\n");
        return JSON.stringify({
            success: false,
            message: error.message,
            data: null
        })
    }
}