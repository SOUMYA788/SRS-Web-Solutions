import dbConnection from "@/middleware/dbConnection";
import UserModel from "@/models/user.models";

export const getAllUsersData = async (loginSecret, loginEmail) => {
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
        if (!accountInfo) { throw new Error("Please Enter Valid Credentials") }

        // Account Found, Varified During Login and this Featch Call by loginSecreat.
        // finding all users and return them to admin...
        const allUsers = await UserModel.find({ role: "user" });

        return allUsers

    } catch (error) { console.log("Please Enter Valid Credentials") }
}