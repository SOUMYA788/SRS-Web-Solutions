"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
const NavLink = ({navRef, navLinkClass, activeNavClass, children }) => {
    const pathName = usePathname();
    return (
        <Link href={navRef} className={`${navLinkClass} ${pathName === navRef ? activeNavClass : ""}`}>
            {children}
        </Link>
    )
}

export default NavLink