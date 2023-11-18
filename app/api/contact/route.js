import dbConnection from "@/middleware/dbConnection";
import ContactModel from "@/models/contact";

export const POST = async (req) => {
    const { userEmail, userMessage } = await req.json();
    await dbConnection()
    try {
        const newMessage = new ContactModel({
            userEmail,
            userMessage
        });
        await newMessage.save()
        console.log("saved");
        return new Response(JSON.stringify(newMessage), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({
            // make errror resul 
            result: "Sorry! Your Message Didn't Sent Succesfully",
            error
        }), { status: 500 });
    }
} 