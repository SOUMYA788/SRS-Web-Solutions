"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

const DashboardNav = ({userId}) => {
const pathName = usePathname();
console.log("logging pathname from DashboardNav Component", pathName);
    return (
        <div className='w-1/2 h-fit sm:w-40 rounded-sm p-2 flex flex-col gap-3'>
            
            <Link href={`/dashbord/${userId}`} className={`p-2 bg-blue-500 text-white uppercase text-center tracking-wide rounded-md opacity-100 transition-colors border-2 ${pathName === `/dashbord/${userId}` ? "border-blue-700" : ""} text-sm`}>profile</Link>

            <Link href={`/dashbord/${userId}/orders`} className={`p-2 bg-blue-500 text-white uppercase text-center tracking-wide rounded-md opacity-100 transition-colors border-2 ${pathName === `/dashbord/${userId}/orders`? "border-blue-700" : ""} } `}>orders</Link>

        </div>
    )
}

export default DashboardNav