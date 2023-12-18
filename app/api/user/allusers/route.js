import bcryptjs from "bcrypt"
import dbConnection from "@/middleware/dbConnection";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    // getting all information from form...
    const { loginEmail, loginPassword } = await req.json();

    try {
        // trying to connect to database...
        await dbConnection();

        // we are connected to database, now find user from database...
        const accountInfo = await UserModel.findOne({ userEmail: loginEmail })

        // if account not found that means user may be a hacker
        if (!accountInfo) {
            return new Response(JSON.stringify({
                success: false,
                error: "Please Enter Valid Credentials"
            }), { status: 400 })
        }

        //getting user's hash password from database...
        const userHashPassword = await accountInfo.userPassword;

        // Matching user password to database password...
        const passwordMatch = await bcryptjs.compare(loginPassword, userHashPassword)

        // if password not matched, user may be a hacker...
        if (!passwordMatch) {
            return new Response(JSON.stringify({
                success: false,
                error: "Please Enter Valid Credentials"
            }), { status: 400 })
        }

        // password matched, admin authenticated, featch all users 
        const allUsers = await UserModel.find({ role: "user" });

        // return all users list to admin...
        return NextResponse.json({
            success: true,
            message: "All Users Featched",
            varified: true,
            allUsers
        }, { status: 200 })

    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            message: "Internal Server Error"
        }), { status: 500 })
    }
}