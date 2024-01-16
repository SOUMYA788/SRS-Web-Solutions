"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
const NavLink = ({navRef, className, activeNavClass, restNavClass, navLinkClick, children }) => {
    const pathName = usePathname();
    return (
        <Link href={navRef} className={`${className} ${pathName === navRef ? activeNavClass : (restNavClass || "")}`} onClick={navLinkClick}>
            {children}
        </Link>
    )
}

export default NavLink