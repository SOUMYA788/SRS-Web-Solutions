import bcryptjs from "bcrypt"
import jwt  from "jsonwebtoken";
import dbConnection from "@/middleware/dbConnection";
import UserModel from "@/models/user.models";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const { loginEmail, loginPassword } = await req.json();

    try {
        await dbConnection();
        
        const accountInfo = await UserModel.findOne({ userEmail: loginEmail })


        if (!accountInfo) {
            return new Response(JSON.stringify({
                success: false,
                error: "Please Enter Valid Credentials"
            }), { status: 400 })
        }

        console.log("User Info", accountInfo);        

        const userHashPassword = await accountInfo.userPassword;

        const passwordMatch = await bcryptjs.compare(loginPassword, userHashPassword)

        if (!passwordMatch) {
            return new Response(JSON.stringify({
                success: false,
                error: "Please Enter Valid Credentials"
            }), { status: 400 })
        }
        
        // create token data
        const tokenData = {
            id: accountInfo._id,
            userName: accountInfo.userName,
            userEmail: accountInfo.userEmail,
        
        }

        // create JWT Token
        const jwtToken = await jwt.sign(tokenData, process.env.JWT_PRIVATE_KEY, { expiresIn: "7d" })
        
        const successResponse =  NextResponse.json({
            success: true,
            message: "logged in! welcome to your account.",
            userId: accountInfo._id.toString()
        }, { status: 200 })

        successResponse.cookies.set(process.env.TOKEN_COOKIE_KEY, jwtToken, {httpOnly:true});

        return successResponse;

    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            message: "Internal Server Error"
        }), { status: 500 })
    }
}