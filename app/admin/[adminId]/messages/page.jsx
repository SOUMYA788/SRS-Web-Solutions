import MessagesPage from '@/components/MessagesPage';
import { getUsersMessages } from '@/utils/databaseUtils';
import React from 'react'


const Messages = async () => {
    const { success, data } = await getUsersMessages();
    const messages = success ? JSON.parse(data) : null;

    if(!messages || !messages?.length > 0) return <h2 className='text-slate-800 dark:text-slate-300'> No Messages Available </h2>

    return <MessagesPage messages={messages} />
}

export default Messages