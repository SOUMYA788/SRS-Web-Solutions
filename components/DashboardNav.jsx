import React from 'react'
import NavLink from './NavLink'
import { ADMIN_DASHBOARD_LINKS, USER_DASHBOARD_LINKS } from '@/constants'

const DashboardNav = ({ userId, forAdmin }) => {
    return (
        <div className='w-fit max-w-full sm:w-40 sm:max-w-none h-fit sm:sticky sm:h-full sm:top-20 mx-auto rounded-sm p-2 flex flex-row sm:flex-col gap-3 overflow-x-scroll sm:overflow-x-hidden'>

            {
                forAdmin && ADMIN_DASHBOARD_LINKS.map(({ id, title, link }) => (
                    <NavLink key={id} navRef={`/admin/${userId}${link}`} className="flex-1 p-2 bg-blue-500 dark:bg-slate-700 focus:text-white dark:focus:text-slate-300 focus:border-black uppercase text-center tracking-wide rounded-md opacity-100 transition-colors outline-none border-2 text-sm dark:focus:border-slate-400" restNavClass="text-slate-200 dark:text-slate-400 dark:border-slate-500" activeNavClass="border-blue-700 dark:border-slate-400 text-white dark:text-slate-300">
                        {title}
                    </NavLink>
                ))
            }

            {
                !forAdmin && USER_DASHBOARD_LINKS.map(({ id, title, link }) => (
                    <NavLink key={id} navRef={`/dashboard/${userId}${link}`} className="flex-1 p-2 bg-blue-500 dark:bg-slate-700 focus:text-white dark:focus:text-slate-300 focus:border-black uppercase text-center tracking-wide rounded-md opacity-100 transition-colors outline-none border-2 text-sm dark:focus:border-slate-400" restNavClass="text-slate-200 dark:text-slate-400 dark:border-slate-500" activeNavClass="border-blue-700 dark:border-slate-400 text-white dark:text-slate-300">
                        {title}
                    </NavLink>
                ))
            }
        </div>
    )
}

export default DashboardNav