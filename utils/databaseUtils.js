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

        const deletedMessage = messages.length > 0 ? await ContactModel.findByIdAndDelete({ _id: messages }) : await ContactModel.deleteMany({ _id: { $in: [...messages] } });

        if (!deletedMessage) { throw new Error("Faild to delete messages") }

        return {
            success: true,
            message: "Messages Deleted Succesfully",
            data: JSON.stringify(deletedMessage)
        }

    } catch (error) {
        return {
            success: false,
            message: "Faild to delete messages",
            data: null
        }
    }
}