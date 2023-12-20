import dbConnection from "@/middleware/dbConnection";
import UserModel from "@/models/User";

export const getAllUsersData = async (loginSecreat, loginEmail) => {
    try {

        // If Login Secreat not matched, means user may be a hacker.
        if (loginSecreat !== process.env.LOGIN_SECREAT) {
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