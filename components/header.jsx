"use client"
import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BiLogInCircle } from "react-icons/bi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [user, setUser] = useState({
        userId: null,
        userName: null,
        userEmail: null,
        userProfilePicture: null,
        userProfileColor: null,
    })

    const [logoutProcess, setLogoutProcess] = useState(false);

    const [iconHover, setIconHover] = useState(false);

    const userIconHoverFunc = () => setIconHover(value => !value)

    const logout = async () => {
        setLogoutProcess(true)
        const logoutResponse = await fetch("api/user/logout")
        const logoutInfo = await logoutResponse.json();
        if (logoutResponse.ok) {
            setLogoutProcess(false);
            setIconHover(false);
            setUserLoggedIn(false)

            toast.success('Logout Succesfully', {
                position: "bottom-center",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        } else {
            toast.error('Faild to Logout', {
                position: "bottom-center",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        }
    }

    useEffect(() => {
        async function getUserData() {
            try {
                const response = await fetch("/api/user");
                if (!response.ok) {
                    setUserLoggedIn(false);
                    setUser({
                        ...user,
                        userId: null,
                        userName: null,
                        userEmail: null,
                        userProfilePicture: null,
                        userProfileColor: null,
                    })
                } else {
                    const {success, userInfo} = await response.json();
                    setUserLoggedIn(success);
                    setUser({
                        ...user,
                        userId:userInfo?._id || null,
                        userName:userInfo?.userName || null,
                        userEmail:userInfo?.userEmail || null,
                        userProfilePicture:userInfo?.userProfilePicture || null,
                        userProfileColor:userInfo?.userProfileColor || null,
                    })
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        getUserData()
    }, [userLoggedIn])

    return (
        <header className="w-full bg-[rgba(255,255,255,0.6)] text-gray-700 text-sm flex flex-col md:flex-row md:gap-10 items-center p-3 body-font sticky top-0 left-0 z-20 backdrop-blur-sm shadow-md">

            <Link href="/" className="flex text-center items-center text-gray-900 font-bold mb-4 md:mb-0">
                <Image src="/images/logo.png" alt="logo" width={50} height={50} className="w-11 h-11 object-contain" />
            </Link>

            <nav className=" flex flex-1 flex-wrap items-center justify-center gap-5">
                <Link href="/" className="capitalize cursor-pointer font-semibold hover:text-black border-none border-slate-500 px-2 py-1">home</Link>
                <Link href="/about" className="capitalize cursor-pointer font-semibold hover:text-black  border-none px-2 py-1">about</Link>
                <Link href="/contact" className="capitalize cursor-pointer font-semibold hover:text-black border-none px-2 py-1">contact</Link>

                <div className="mx-auto md:ml-auto md:mr-0">
                    {
                        !userLoggedIn && <div className="w-full flex flex-row justify-center items-center gap-4 font-semibold">
                            <Link href="/login" className="flex flex-row justify-center items-center gap-2 hover:text-black border-none px-2 py-1">
                                <BiLogInCircle className="text-xl" /> <span>Login</span>
                            </Link>
                        </div>
                    }

                    {
                        userLoggedIn && <div className="relative">
                            {
                                user?.userProfileColor && <div tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") userIconHoverFunc() }} className={`w-11 h-11 rounded-full ${user?.userProfileColor} border border-black cursor-pointer`} onClick={userIconHoverFunc}>
                                    {
                                        user?.userProfilePicture && <Image src={`${user?.userProfilePicture}`} alt="user" width={50} height={50} className="w-full h-full object-contain" />
                                    }
                                </div>
                            }

                            <div className={`absolute top-16 -left-24 p-3 bg-gray-100 rounded-md ${iconHover ? "block" : "hidden"} shadow-md border-2 select-none`}>

                                {user?.userName && <h2 className='text-center text-gray-600 mb-1'> {user?.userName} </h2>}

                                {user?.userEmail && <p className='text-center text-gray-400 text-xs mb-3'> {user?.userEmail} </p>}

                                <Link href={`/dashbord/${user?.userId}`} className='text-gray-600 text-xs p-1 my-1 cursor-pointer capitalize tracking-wider' onClick={() => setIconHover(false)}>dashbord</Link>

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