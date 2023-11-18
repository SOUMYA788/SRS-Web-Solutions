import dbConnection from "@/middleware/dbConnection";
import LoginModel from "@/models/login";

export const POST = async (req) => {
    const { loginEmail, loginPassword } = req.json();
    try {
        await dbConnection();
        const accountInfo = await LoginModel.findOne({ userEmail: loginEmail })

        if (!accountInfo) {
            return new Response(JSON.stringify({
                success: false,
                error: "Please Enter Valid Credentials"
            }), {status:400})
        }

        return new Response(JSON.stringify({
            success: true,
            error: "Account Found!"
        }), {status:200})

    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: "Internal Server Error"
        }), {status:500})
    }
}