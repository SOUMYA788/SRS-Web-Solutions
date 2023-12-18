import dbConnection from "@/middleware/dbConnection";
import UserModel from "@/models/User";
import { getTokenData } from "@/utils/tokendata";

export const PUT = async (req) => {
    const data = await req.json();

    try {
        const userId = await getTokenData();
        await dbConnection();

        const updatedProfile = await UserModel.findByIdAndUpdate({ _id: userId }, data);

        // we will proceed if email is not exist in database...
        if (!updatedProfile) {
            return new Response(JSON.stringify({
                success: false,
                message: "Internal Server Error"
            }), { status: 500 });
        }

        return new Response(JSON.stringify({
            success: true,
            message: "Updated Succesfully"
        }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            message: "Internal Server Error"
        }), { status: 500 });
    }

}