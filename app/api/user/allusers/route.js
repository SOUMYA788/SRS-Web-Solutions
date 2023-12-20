import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    // getting all information from form...
    const { loginSecreat } = await req.json();
    const unauthorisedMessage = "You are not authorised to access this data!"

    try {
        // If Login Secreat not matched, means user may be a hacker.
        if (loginSecreat !== process.env.LOGIN_SECREAT) { throw new Error(unauthorisedMessage) }

        // getting userId from cookie jwt token 
        const userId = await getTokenData(req, null);

        // checking that user is valid or not
        const validUser = await UserModel.findOne({ _id: userId }).select("-userPassword");

        // if not valid then throw error
        if (!validUser) { throw new Error(unauthorisedMessage) }

        // If we reach here, means admin is valid, so getting all users of our site...
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
            message: error.message
        }), { status: 500 })
    }
}