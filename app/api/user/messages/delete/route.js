import dbConnection from "@/middleware/dbConnection";
import ContactModel from "@/models/contact.models";
import { getTokenData } from "@/utils/tokendata";
import { NextResponse } from "next/server"

export const POST = async (req) => {
    const { loginSecreat } = await req.json();
    const unauthorisedMessage = "You are not authorised to access this data!"

    try {
        await dbConnection();
        
        // If Login Secreat not matched, means user may be a hacker.
        if (loginSecreat !== process.env.LOGIN_SECRET) { throw new Error(unauthorisedMessage) }

        // getting userId from cookie jwt token 
        const userId = await getTokenData(req, null);

        // If user not found.
        if (!userId) { throw new Error(unauthorisedMessage) }

        // fetching messages
        const messages = await ContactModel.find();

        // if messages not found
        if (!messages) { throw new Error("Messages Not Found!") }

        NextResponse.json({
            success: true,
            messages: "All Messages Fetched",
            data: messages,
        }, { status: 200 })

    } catch (error) {
        NextResponse.json({
            success: false,
            message: error.message || "Sorry, Logout Faild!",
            data: null,
        }, { status: 500 })
    }
}