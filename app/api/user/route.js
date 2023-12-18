import { NextResponse } from "next/server"
import { getUserData } from "@/utils/getUserData"

export const GET = async (req) => {
    try {
        const validUser = await getUserData(req, null);

        if (!validUser) {
            return NextResponse.json({
                success: false,
                message: "Please refresh the browser or login again"
            }, { status: 400 })
        }

        return NextResponse.json({
            success: true,
            message: "user found",
            userInfo: JSON.parse(validUser)
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Some Error Occoured",
            error: JSON.parse(error.message)
        }, { status: 500 })
    }
}