"use client"
import React, { useEffect, useState } from 'react'
import MessagesCard from './cards/MessagesCard'
import { useRouter } from 'next/navigation';

const MessagesPage = ({ messages }) => {
    const [selectMessages, setSelectMessages] = useState([]);
    const [allSelected, setAllSelected] = useState(false);

    const clickSelectAllBtn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setAllSelected(value => !value);
    }

    useEffect(() => {
        if (!allSelected || !selectMessages.length > 0) {setSelectMessages([])}
    }, [allSelected, setSelectMessages])


    return (
        <>
            <div className='text-xs mb-5 tracking-wide text-slate-800 dark:text-slate-400 flex flex-row items-center justify-end gap-4 select-none'>

                <button type="button" className='w-24 text-xs text-white bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-800 shadow-lg shadow-slate-500/50 dark:shadow-lg dark:shadow-slate-800/80 font-medium text-center border-none outline-none tracking-wide px-3 py-2 rounded-full transition-colors uppercase' onClick={clickSelectAllBtn}>{allSelected ? "cancel" : "select all"}</button>

                <button type="button" className='text-xs text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 disabled:bg-slate-700 disabled:from-transparent disabled:via-transparent disabled:to-transparent disabled:text-slate-300 disabled:hover:cursor-not-allowed disabled:shadow-none font-medium text-center border-none outline-none tracking-wide px-4 py-2 rounded-md uppercase' disabled={!allSelected}>delete</button>

            </div>

            <div className='w-full flex flex-wrap gap-3 relative'>
                {
                    messages.map((message) => (
                        <MessagesCard key={message._id} message={message} allSelected={allSelected} selectMessages={selectMessages} setSelectMessages={setSelectMessages} />
                    ))
                }
            </div>
        </>
    )
}

export default MessagesPage