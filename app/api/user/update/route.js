import dbConnection from "@/middleware/dbConnection";
import UserModel from "@/models/user.models";
import { getTokenData } from "@/utils/tokendata";

export const PUT = async (req) => {
    const data = await req.json();

    try {
        const userId = await getTokenData(req, null);
        await dbConnection();

        const updatedProfile = await UserModel.findByIdAndUpdate({ _id: userId }, data).select("-password -_id");

        // we will proceed if email is not exist in database...
        if (!updatedProfile) {
            throw new Error("Faild to update profile");
        }

        return new Response(JSON.stringify({
            success: true,
            message: "Updated Succesfully",
        }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            message: "Internal Server Error",
        }), { status: 500 });
    }

}