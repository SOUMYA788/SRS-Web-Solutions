import ContactModel from '@/models/contact.models';
import { dateAndTimeFormatter } from '@/utils/dateAndTimeFormatter';
import React from 'react'



const Messages = async () => {
    const getUsersMessages = async () => {
        "use server"

        try {
            // fetching messages
            const messages = await ContactModel.find();

            // if messages not found
            if (!messages) { throw new Error("Messages Not Found!") }

            return messages;
        } catch (error) {
            return null;
        }

    }

    const messages = await getUsersMessages();

    if (!messages || !messages.length > 0) return <h2 className='text-slate-800 dark:text-slate-300'> No Messages Available </h2>

    return (

        <div className='w-full flex flex-wrap gap-3'>
            {
                messages.map((message) => (
                    <div key={message._id} className='w-full xs:w-80 734px:w-[45%] lg:w-1/4 mx-auto sm:mx-0 sm:justify-between bg-slate-200 dark:bg-slate-700 p-3 rounded-md'>
                        <p className='text-xs text-slate-800 dark:text-slate-400 mb-2'>by {message.userEmail}</p>

                        <p className='text-xs text-slate-800 dark:text-slate-400 mb-3'> {dateAndTimeFormatter(message.createdAt)}</p>

                        <p className='text-sm text-black dark:text-white'> {message.userMessage} </p>
                    </div>
                ))
            }
        </div>
    )
}

export default Messages