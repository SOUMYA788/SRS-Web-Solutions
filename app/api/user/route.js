import dbConnection from "@/middleware/dbConnection"
import { getTokenData } from "@/middleware/tokendata"
import UserModel from "@/models/User"
import { NextResponse } from "next/server"

export const GET = async (request) => {
    try {
        await dbConnection();

        const tokenID = await getTokenData(request)

        if (!tokenID) {
            return NextResponse.json({
                success: false,
                message: "Invalid Token ID"
            }, { status: 400 })
        }

        const validUser = await UserModel.findOne({ _id: tokenID }).select("-userPassword");

        console.log("user route: User Found");

        if (!validUser) {
            return NextResponse.json({
                success: false,
                message: "Invalid User"
            }, { status: 400 })
        }

        return NextResponse.json({
            success: true,
            message: "user found",
            userInfo: validUser
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Some Error Occoured",
            error: JSON.parse(error.message)
        }, { status: 500 })
    }

}