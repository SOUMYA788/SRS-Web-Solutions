import OrderModel from "@/models/orders.model";
import { getTokenData } from "./tokendata";
import dbConnection from "@/middleware/dbConnection";

export const getUserOrders = async (req, cookies, userId, loginSecret) => {
    try {
        await dbConnection();

        if (loginSecret && loginSecret !== process.env.LOGIN_SECRET) {
            throw new Error("You are not authorised to access this data");
        }

        const user = userId || await getTokenData(req, cookies);

        const userOrders = user ? await OrderModel.findOne({ user: user }) :  await OrderModel.find();

        if (!userOrders) { throw new Error("Invalid User") }

        return JSON.stringify(userOrders)

    } catch (error) {
        console.log("\n\n⚠⚠ ORDER_DETAILS_ERROR ⚠⚠\n", error.message);
    }
}