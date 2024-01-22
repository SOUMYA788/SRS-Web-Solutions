"use server"

import dbConnection from "@/middleware/dbConnection";
import ContactModel from "@/models/contact.models";

export const getUsersMessages = async (userEmail) => {
    try {
        await dbConnection();

        const messages = userEmail ? await ContactModel.find({ userEmail: userEmail }) : await ContactModel.find();

        if (!messages) { throw new Error("Faild to found messages") };

        return {
            success: true,
            message: "Messages Found Succesfully",
            data: JSON.stringify(messages)
        }
    } catch (error) {
        return {
            success: false,
            message: "Faild to found messages.",
            data: null
        }
    }

}

export const deleteUserMessages = async (messages) => {
    try {
        await dbConnection();

        if (!messages.length > 0) {
            throw new Error("select a message to delete")
        }

        if (messages.length === 1) {
            const _id = messages[0].toString().trim();
            console.log(_id, "from final delete method");
            const deletedMessage = await ContactModel.findByIdAndDelete({_id});
            if (!deletedMessage) { throw new Error("Faild to delete messages") }
            return {
                success: true,
                message: "Messages Deleted Succesfully",
                data: JSON.stringify(deletedMessage)
            }
        } else if (messages.length > 1) {
            const deletedMessage = await ContactModel.deleteMany({ _id: { $in: [...messages] } });
            if (!deletedMessage) { throw new Error("Faild to delete messages") }
            return {
                success: true,
                message: "Messages Deleted Succesfully",
                data: JSON.stringify(deletedMessage)
            }
        }

    } catch (error) {
        return {
            success: false,
            message: error.message || "Faild to delete messages",
            data: null
        }
    }
}