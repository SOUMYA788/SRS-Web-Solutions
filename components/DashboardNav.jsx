import Link from 'next/link'
import React from 'react'

const DashboardNav = ({userId}) => {
    return (
        <div className='w-1/2 h-fit sm:w-40 rounded-sm p-2 flex flex-col gap-3'>

            <Link href={`/dashbord/${userId}`} className='p-2 bg-blue-500 text-white uppercase text-center tracking-wide rounded-md opacity-90 focus:opacity-100 transition-colors border-2 border-blue-700 text-sm'>profile</Link>

            <Link href={`/dashbord/${userId}/orders`} className='p-2 bg-blue-500 text-white uppercase text-center tracking-wide rounded-md opacity-90 focus:opacity-100 transition-colors border-2 border-blue-700 text-sm'>orders</Link>

        </div>
    )
}

export default DashboardNav