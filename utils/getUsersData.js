import dbConnection from "@/middleware/dbConnection";
import UserModel from "@/models/user.models";
import { getTokenData } from "./tokendata";

export const getUsersData = async (loginSecret, loginEmail) => {
    try {

        // If Login Secret not matched, means user may be a hacker.
        if (loginSecret && loginSecret !== process.env.LOGIN_SECRET) {
            throw new Error("You are not authorised to access this data!")
        }

        // trying to connect to database...
        await dbConnection();

        // we are connected to database, now find user from database...
        const accountInfo = await UserModel.findOne({ userEmail: loginEmail })

        // if account not found that means user may be a hacker
        if (!accountInfo) { throw new Error("Invalid User") }

        // Account Found, Varified During Login and this Featch Call by loginSecreat.
        // finding all users and return them to admin...
        const allUsers = await UserModel.find({ role: "user" });

        return allUsers

    } catch (error) { console.log("Please Enter Valid Credentials") }
}


export const getUserData = async (req, cookies, userId, loginSecret) => {
    try {

        await dbConnection();

        if (loginSecret && loginSecret !== process.env.LOGIN_SECRET) {
            throw new Error("You are not authorised to access this data");
        }

        const tokenID = userId || await getTokenData(req, cookies)

        if (!tokenID) { throw new Error("Please refresh the browser or login again") }

        const validUser = await UserModel.findOne({ _id: tokenID }).select("-userPassword");

        if (!validUser) { throw new Error("Please refresh the browser or login again") }

        return {
            success: true,
            message: "User Found Successfully",
            data: JSON.stringify(validUser),
        }

    } catch (error) {
        return {
            success: false,
            message: "User Not Found",
            data: null,
        }
    }
}