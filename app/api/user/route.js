import { getUserData } from "@/utils/getUsersData";
import { NextResponse } from "next/server"


export const GET = async (req) => {
    try {
        const { success, message, data } = await getUserData(req);

        if (!success) {
            return NextResponse.json({
                success,
                message: "Please refresh the browser or login again"
            }, { status: 400 })
        }

        return NextResponse.json({
        
            success, message,
            data: JSON.parse(data)
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message || "User Not Found",
            data: null
        }, { status: 500 })
    }
}