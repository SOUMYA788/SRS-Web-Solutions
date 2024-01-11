"use client"

import React, { useEffect, useState } from 'react'
import { BiLogInCircle, BiToggleLeft } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';
import { assignUser, removeUser, userLoggedIn } from '@/Redux/slices/userSlice';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link'
import { showErrorToast, showSuccessToast } from '@/utils/showToast';
import HeaderUserCorner from '@/components/HeaderUserCorner';
import { TOP_NAV_LINKS } from '@/constants';
import NavLink from './NavLink';

import { IoMenu } from "react-icons/io5"
import ThemeSwitch from './ThemeSwitch';
import { useTheme } from 'next-themes';

const Header = () => {
const {theme}=useTheme()
    const [showTopNav, setShowTopNav] = useState(false);
    const [userLoginIconHover, setUserLoginIconHover] = useState(false);
    const [logoutProcess, setLogoutProcess] = useState(false);

    const router = useRouter();

    const dispatch = useDispatch();

    // return two values loggedIn and info, use both in return...
    const user = useSelector((state) => state.user)

    const userIconHoverFunc = () => { setUserLoginIconHover(value => !value) }
    const toggleTopNav = () => setShowTopNav(value => !value)
    const logout = async () => {
        setLogoutProcess(true)
        try {
            const logoutResponse = await fetch("/api/user/logout")
            if (logoutResponse.ok) {
                dispatch(userLoggedIn(false))
                dispatch(removeUser());

                showSuccessToast('Logout Succesfully')

                setTimeout(() => {
                    router.push("/")
                }, 700);
            } else {
                throw new Error("Faild to Logout")
            }
        } catch (error) {
            showErrorToast('Faild to Logout')
        } finally {
            setLogoutProcess(false);
            setUserLoginIconHover(false);
        }

    }


    useEffect(() => {
        async function getUserData() {
            try {
                const response = await fetch("/api/user");
                if (!response.ok) {
                    dispatch(userLoggedIn(false))
                    dispatch(removeUser())
                } else {
                    const { success, userInfo } = await response.json();
                    dispatch(userLoggedIn(success))
                    dispatch(assignUser(userInfo))
                }
            } catch (error) {
                console.log("faild to get profile");
            }
        }
        getUserData()
    }, [user.loggedIn, theme])



    return (
        <header className="w-full text-sm body-font fixed sm:sticky top-0 left-0 z-50">

            <div className="text-2xl absolute top-2 left-2 z-30 bg-gray-500 text-gray-200 p-2 rounded-full cursor-pointer sm:hidden" onClick={toggleTopNav}>
                <IoMenu className="text-slate-100 rounded-full border-transparent focus:border-slate-800" />
            </div>


            <nav className={`w-52 sm:w-full h-screen sm:h-fit bg-slate-100 bg-opacity-80 dark:bg-opacity-80 dark:bg-slate-800 dark:text-slate-400 text-gray-700 flex flex-col sm:flex-row absolute sm:static ${showTopNav ? "left-0" : "-left-full"} sm:left-0 p-3 gap-5 sm:gap-10 items-center ustify-center backdrop-blur-sm dark:backdrop-blur-sm shadow-md`}>

                <Link href="/" className="flex text-center items-center text-gray-900 border-2 outline-none border-transparent focus:border-slate-500 font-bold mb-2 sm:mb-0 rounded-full" onClick={(e) => setShowTopNav(false)}>
                    <Image src="/images/logo.png" alt="logo" width={100} height={100} className="w-11 h-11 object-contain rounded-full" />
                </Link>


                <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-5 text-center">
                    {
                        TOP_NAV_LINKS.map(({ id, title, link }) => (
                            <NavLink key={id} navRef={link} className="dark:text-slate-400 capitalize cursor-pointer font-semibold outline-none border-b-2 border-transparent focus:border-slate-500 hover:text-black px-2 py-1" activeNavClass="border-b-2" navLinkClick={() => setShowTopNav(false)}>
                                {title}
                            </NavLink>
                        ))
                    }
                </div>


                <div className="mx-auto sm:ml-auto sm:mr-0 flex flex-col sm:flex-row items-center justify-center gap-5">
                    <ThemeSwitch />
                    {
                        !user.loggedIn && <div className="w-full flex flex-row justify-center items-center gap-4 font-semibold">
                            {/* Here may be more then one link in future, so outer div is important. */}
                            <Link href="/login" className="flex flex-row justify-center items-center gap-2 dark:text-slate-400 hover:text-black outline-none border-transparent border-2 focus:border-slate-500 px-2 py-1">
                                <BiLogInCircle className="text-xl" /> <span>Login</span>
                            </Link>
                        </div>
                    }

                    {
                        user.loggedIn && <div className="relative mx-auto">
                            {
                                user?.value?.userProfileColor && <div tabIndex={0} onKeyDown={(e) => (e.key === "Enter") && userIconHoverFunc()} className={`w-11 h-11 rounded-full ${user?.value?.userProfileColor} border border-black cursor-pointer overflow-hidden`} onClick={userIconHoverFunc}>
                                    {
                                        user?.value?.userProfilePicture && <Image src={`${user?.value?.userProfilePicture}`} alt="user" width={50} height={50} className="w-full h-full object-contain rounded-full" />
                                    }
                                </div>
                            }

                            <div className={`absolute top-16 sm:right-5 p-3 bg-gray-100 dark:bg-slate-800 dark:text-slate-300 rounded-md ${userLoginIconHover ? "block" : "hidden"} shadow-md border-2 select-none`}>

                                {user?.value?.userName && <h2 className='text-center mb-1'> {user?.value?.userName} </h2>}

                                {user?.value?.userEmail && <p className='text-center text-xs mb-3'> {user?.value?.userEmail} </p>}

                                <Link href={`/${user?.value?.role === "admin" ? "admin" : "dashboard"}/${user?.value?._id}/`} className='text-gray-600 dark:text-white text-xs p-1 my-1 cursor-pointer capitalize tracking-wider' onClick={() => setUserLoginIconHover(false)}>dashbord</Link>

                                <button type="button" disabled={logoutProcess} className='w-full text-white font-semibold text-xs cursor-pointer text-center bg-red-500 mx-auto px-2 py-1 mt-3 uppercase tracking-wider disabled:opacity-50' onClick={logout}>{logoutProcess ? "Processing" : "logout"}</button>
                            </div>
                        </div>
                    }
                </div>

            </nav>
        </header>
    )
}

export default Header