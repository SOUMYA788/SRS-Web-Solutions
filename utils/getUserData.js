import dbConnection from "@/middleware/dbConnection";
import { getTokenData } from "./tokendata";
import UserModel from "@/models/user.models";

// Here i cannot import cookies from next/header because it's use in user api then it will be client side basically, and in client side server functions are not allowed....😢

// used in
// - api/user,
export const getUserData = async (req, cookies, userId, loginSecret) => {
    try {
        
        await dbConnection();

        if(loginSecret && loginSecret !== process.env.LOGIN_SECRET){
            throw new Error("You are not authorised to access this data");
        }

        const tokenID = userId || await getTokenData(req, cookies)

        if (!tokenID) { throw new Error("Please refresh the browser or login again") }

        const validUser = await UserModel.findOne({ _id: tokenID }).select("-userPassword");

        if (!validUser) {throw new Error("Please refresh the browser or login again")}

        return JSON.stringify(validUser)

    } catch (error) { 
        console.log(error)
    }
}