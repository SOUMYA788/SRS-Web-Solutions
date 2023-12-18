import React from 'react'
import NavLink from './NavLink'
import { ADMIN_DASHBOARD_LINKS, USER_DASHBOARD_LINKS } from '@/constants'

const DashboardNav = ({ userId, forAdmin }) => {
    return (
        <div className='w-1/2 h-fit sm:w-40 rounded-sm p-2 flex flex-col gap-3'>

            {
                forAdmin && ADMIN_DASHBOARD_LINKS.map(({id, title, link}) => (
                    <NavLink key={id} navRef={`/admin/${userId}${link}`} navLinkClass="p-2 bg-blue-500 text-white uppercase text-center tracking-wide rounded-md opacity-100 transition-colors border-2 text-sm" activeNavClass="border-blue-700">
                        {title}
                    </NavLink>
                ))
            }

            {
                !forAdmin && USER_DASHBOARD_LINKS.map(({id, title, link}) => (
                    <NavLink key={id} navRef={`/admin/${userId}${link}`} navLinkClass="p-2 bg-blue-500 text-white uppercase text-center tracking-wide rounded-md opacity-100 transition-colors border-2 text-sm" activeNavClass="border-blue-700">
                        {title}
                    </NavLink>
                ))
            }
        </div>
    )
}

export default DashboardNav