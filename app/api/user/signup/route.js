import dbConnection from "@/middleware/dbConnection";
import UserModel from "@/models/User";
import bcryptjs from "bcrypt"

export const POST = async (req) => {
    const { userName, userEmail, userPhone, userPassword } = await req.json();

    // varify all those req stuffs...
    if(!userName.length || !userEmail.length || !userPhone.length || !userPassword.length){
        return new Response(JSON.stringify({
            success: false,
            message: "One of User Credential are Missing"
        }), { status: 400 });
    }

    try {
        await dbConnection();

        const userExist = await UserModel.findOne({ userEmail })

        // we will proceed if email is not exist in database...
        if (userExist) {
            return new Response(JSON.stringify({
                success: false,
                message: "Account Already Exist"
            }), { status: 400 });
        }

        // hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(userPassword, salt);

        const newUser = new UserModel({ userName, userEmail, userPhone, userPassword: hashedPassword })
        console.log("newUser", newUser);

        const savedUser = await newUser.save()

        return new Response(JSON.stringify({
            success: true, 
            message: "User Created Succesfully",
            savedUser
        }), {status:200})


    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            message: "Internal Server Error",
            error
        }), { status: 500 });
    }
}