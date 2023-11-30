import jwt from "jsonwebtoken";

export const getTokenData = async (request) => {
    try {

        const tokenData = request.cookies.get(process.env.TOKEN_COOKIE_KEY)?.value || null;

        if (!tokenData) {  throw new Error("Token Not Available") }

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