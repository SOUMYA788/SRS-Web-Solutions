import dbConnection from "@/middleware/dbConnection"
import { getTokenData } from "./tokendata"
import PaymentModel from "@/models/payments.models";

export const getUserPaymentDetails = async (req, cookies, userId, loginSecret) => {
    try {

        if (loginSecret && loginSecret !== process.env.LOGIN_SECRET) { throw new Error("You are not authorised to access this data") }

        await dbConnection();

        const tokenId = userId || await getTokenData(req, cookies);

        const paymentDetails = tokenId ? await PaymentModel.findOne({ user: tokenId }) : await PaymentModel.find();

        if (!paymentDetails) throw new Error("Details Not Found");

        return JSON.stringify(paymentDetails);

    } catch (error) {
        console.log("\n\n⚠⚠ PAYMENT_DETAILS_ERROR ⚠⚠\n", error.message, "\n\n");
    }
}