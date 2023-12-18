"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
const NavLink = ({navRef, navLinkClass, activeNavClass, children }) => {
    const pathName = usePathname();
    console.log("pathName is", pathName);
    console.log("navRef is", navRef);
    return (
        <Link href={navRef} className={`${navLinkClass} ${pathName === navRef ? activeNavClass : ""}`}>
            {children}
        </Link>
    )
}

export default NavLink