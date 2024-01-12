import React from 'react'
import NavLink from './NavLink'
import { ADMIN_DASHBOARD_LINKS, USER_DASHBOARD_LINKS } from '@/constants'

const DashboardNav = ({ userId, forAdmin }) => {
    return (
        <div className='w-fit max-w-full sm:w-40 sm:max-w-none h-fit mx-auto rounded-sm p-2 flex flex-row sm:flex-col gap-3 overflow-x-scroll sm:overflow-x-hidden'>

            {
                forAdmin && ADMIN_DASHBOARD_LINKS.map(({id, title, link}) => (
                    <NavLink key={id} navRef={`/admin/${userId}${link}`} className="flex-1 p-2 bg-blue-500 dark:bg-slate-700 text-slate-300 border-blue-700 dark:border-slate-500 dark:focus:border-slate-400 uppercase text-center tracking-wide rounded-md opacity-100 transition-colors outline-none border-2 text-sm" activeNavClass="border-blue-700">
                        {title}
                    </NavLink>
                ))
            }

            {
                !forAdmin && USER_DASHBOARD_LINKS.map(({id, title, link}) => (
                    <NavLink key={id} navRef={`/dashboard/${userId}${link}`} className="p-2 bg-blue-500 dark:bg-slate-700 text-slate-300 border-blue-700 dark:border-slate-500 dark:focus:border-slate-400 uppercase text-center tracking-wide rounded-md opacity-100 transition-colors outline-none border-2 text-sm" activeNavClass="border-blue-700">
                        {title}
                    </NavLink>
                ))
            }
        </div>
    )
}

export default DashboardNav