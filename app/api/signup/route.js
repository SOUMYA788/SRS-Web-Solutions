import dbConnection from "@/middleware/dbConnection";
import SignInModel from "@/models/signin";

export const POST = async (req) => {
    const { userName, userEmail, userNumber, userPassword } = req.json();
    try {
        await dbConnection();
        const emailExist = SignInModel.findOne({ userEmail })

        // we will proceed if email is not exist in database...
        if (emailExist) {
            return new Response(JSON.stringify({
                success: false,
                message: "Account Already Exist"
            }), { status: 400 });
        }

        // first hash the password, then proaceed...


    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            message: "Internal Server Error"
        }), { status: 500 });
    }
}