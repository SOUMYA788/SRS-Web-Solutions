import { NextResponse } from "next/server"

export const GET = () => {
    try {
        const logoutResponse = NextResponse.json({
            success: true,
            message: "Logout Succesfully"
        }, { status: 200 })
        logoutResponse.cookies.set(process.env.TOKEN_COOKIE_KEY, "", {
            httpOnly: true,
            expires: new Date(0)
        })
        return logoutResponse;
    } catch (error) {
        NextResponse.json({
            success: false,
            message: "Sorry, Logout Faild!"
        }, { status: 500 })
    }
}