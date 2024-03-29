import OrderModel from "@/models/orders.model";
import { getTokenData } from "./tokendata";
import dbConnection from "@/middleware/dbConnection";

// req, and cookies are not used as i thought, it should be removed after project completion.
export const getUserOrders = async (req, cookies, userId, loginSecret) => {
    try {
        await dbConnection();

        if (loginSecret && loginSecret !== process.env.LOGIN_SECRET) {
            throw new Error("You are not authorised to access this data");
        }

        const user = userId || await getTokenData(req, cookies);

        const userOrders = user ? await OrderModel.find({ user }) :  await OrderModel.find();

        if (!userOrders) { throw new Error("Invalid User") }

        return JSON.stringify(userOrders)

    } catch (error) {
        console.log("\n\n⚠⚠ ORDER_DETAILS_ERROR ⚠⚠\n", error.message);
    }
}