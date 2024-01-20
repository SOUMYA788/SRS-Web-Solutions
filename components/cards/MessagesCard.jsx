"use client"
import { deleteUserMessages } from '@/utils/databaseUtils'
import { dateAndTimeFormatter } from '@/utils/dateAndTimeFormatter'
import { showErrorToast, showSuccessToast } from '@/utils/showToast'
import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'

const MessagesCard = ({ message, allSelected, selectMessages, setSelectMessages }) => {
    const [deleteChecked, setDeleteChecked] = useState(false);

    const messageSelected = selectMessages?.includes(message?._id);

    useEffect(() => {
        setDeleteChecked(allSelected)
    }, [allSelected])

    useEffect(() => {
        if ((deleteChecked && !messageSelected)) {
            setSelectMessages((value) => [...value, message._id]);
        } else if ((!deleteChecked && messageSelected)) {
            const filteredMessage = selectMessages?.filter(value => value !== message?._id);
            if (filteredMessage) { setSelectMessages([...filteredMessage]) }
        }
    }, [deleteChecked])

    return (
        <>
            <div key={message._id} className={`w-full xs:w-80 734px:w-[45%] lg:w-1/4 mx-auto sm:mx-0 sm:justify-between ${messageSelected ? "bg-red-300 ring-2 ring-red-600" : "bg-slate-200 dark:bg-slate-700"}  p-3 rounded-md`}>

                <div className='text-xs tracking-wide text-slate-300 flex flex-row items-center justify-end gap-2'>
                    <div className='w-4 h-4'>
                        {
                            allSelected && <input type="checkbox" name="deleteCheck" checked={deleteChecked} className='w-full h-full outline-none ring-2 ring-transparent hover:ring-red-600 focus:ring-red-600 cursor-pointer checked:bg-red-500 dark:checked:bg-red-300' onChange={() => setDeleteChecked(value => !value)} />
                        }
                    </div>
                </div>

                <p className={`text-xs  ${messageSelected ? "text-slate-700" : "text-slate-800 dark:text-slate-400"} mb-2`}>by {message.userEmail}</p>

                <p className={`text-xs ${messageSelected ? "text-slate-700" : "text-slate-800 dark:text-slate-400"} mb-3`}> {dateAndTimeFormatter(message.createdAt)}</p>

                <p className={`text-sm ${messageSelected ? "text-black" : "text-black dark:text-white"} `}> {message.userMessage} </p>

            </div>
        </>
    )
}

export default MessagesCard