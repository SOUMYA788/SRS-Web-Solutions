import React from 'react'
import NavLink from './NavLink'

const DashboardNav = ({ userId }) => {
    return (
        <div className='w-1/2 h-fit sm:w-40 rounded-sm p-2 flex flex-col gap-3'>
            <NavLink navRef={`/dashboard/${userId}`} navLinkClass="p-2 bg-blue-500 text-white uppercase text-center tracking-wide rounded-md opacity-100 transition-colors border-2 text-sm" activeNavClass="border-blue-700">
                profile
            </NavLink>

            <NavLink navRef={`/dashboard/${userId}/orders`} navLinkClass="p-2 bg-blue-500 text-white uppercase text-center tracking-wide rounded-md opacity-100 transition-colors border-2 text-sm" activeNavClass="border-blue-700">
                orders
            </NavLink>
        </div>
    )
}

export default DashboardNav