import dbConnection from "@/middleware/dbConnection";
import { getTokenData } from "./tokendata";
import UserModel from "@/models/User";

export const getUserData = async (req, cookies) => {
    try {
        await dbConnection();

        const tokenID = await getTokenData(req, cookies)

        if (!tokenID) { throw new Error("Please refresh the browser or login again") }

        const validUser = await UserModel.findOne({ _id: tokenID }).select("-userPassword");

        if (!validUser) {throw new Error("Please refresh the browser or login again")}

        return JSON.stringify(validUser)

    } catch (error) { 
        console.log(error)
    }
}