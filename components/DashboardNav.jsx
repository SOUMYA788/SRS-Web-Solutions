"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const DashboardNav = ({userId}) => {
    const [activeLink, setActiveLink] = useState("profile");
    useEffect(() => {
      setActiveLink("profile")
    }, [])
    
    return (
        <div className='w-1/2 h-fit sm:w-40 rounded-sm p-2 flex flex-col gap-3'>

            <Link href={`/dashbord/${userId}`} className={`p-2 bg-blue-500 text-white uppercase text-center tracking-wide rounded-md ${activeLink === "profile" ? "opacity-100" : "opacity-60"} focus:opacity-80 transition-colors border-2 border-blue-700 text-sm`} onClick={()=>setActiveLink("profile")}>profile</Link>

            <Link href={`/dashbord/${userId}/orders`} className={`p-2 bg-blue-500 text-white uppercase text-center tracking-wide rounded-md ${activeLink === "orders" ? "opacity-100" : "opacity-60" } focus:opacity-80 transition-colors border-2 border-blue-700 text-sm`} onClick={()=>setActiveLink("orders")}>orders</Link>

        </div>
    )
}

export default DashboardNav