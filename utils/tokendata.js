import jwt from "jsonwebtoken";
// import { cookies } from "next/headers" // database home require this, that is server component...
export const getTokenData = async (req, cookies) => {
    try {
        const cookiesStore = req ? req.cookies : cookies;
        const tokenData = cookiesStore.get(process.env.TOKEN_COOKIE_KEY)?.value || null;

        if (!tokenData) { throw new Error("Token Not Available") }

        const varifiedToken = await jwt.verify(tokenData, process.env.JWT_PRIVATE_KEY);

        return varifiedToken?.id;

    } catch (error) {
        throw new Error(JSON.stringify({
            success: false,
            message: "Some Error Occoured",
            error: error.message
        }));
    }
}