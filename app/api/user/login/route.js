import dbConnection from "@/middleware/dbConnection";
import UserModel from "@/models/User";
import bcryptjs from "bcrypt"

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

        const userHashPassword = await accountInfo.userPassword;

        const passwordMatch = await bcryptjs.compare(loginPassword, userHashPassword)

        if (!passwordMatch) {
            return new Response(JSON.stringify({
                success: false,
                error: "Please Enter Valid Credentials"
            }), { status: 400 })
        }

        return new Response(JSON.stringify({
            success: true,
            error: "logged in! welcome to your account."
        }), { status: 200 })

    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: "Internal Server Error"
        }), { status: 500 })
    }
}