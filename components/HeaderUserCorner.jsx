"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { BiLogInCircle } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';
import { assignUser, removeUser, userLoggedIn } from '@/Redux/slices/userSlice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


const HeaderUserCorner = () => {

    const [iconHover, setIconHover] = useState(false);
    const [logoutProcess, setLogoutProcess] = useState(false);

    const router = useRouter();

    const dispatch = useDispatch();

    // return two values loggedIn and info, use both in return...
    const user = useSelector((state) => state.user)

    const userIconHoverFunc = () => setIconHover(value => !value)

    const logout = async () => {
        setLogoutProcess(true)
        try {
            const logoutResponse = await fetch("/api/user/logout")
            if (logoutResponse.ok) {
                dispatch(userLoggedIn(false))
                dispatch(removeUser());
                toast.success('Logout Succesfully', {
                    position: "bottom-center",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                });
                setTimeout(() => {
                    router.push("/")
                }, 700);
            } else {
                throw new Error("Faild to Logout")
            }
        } catch (error) {
            toast.error('Faild to Logout', {
                position: "bottom-center",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        } finally {
            setLogoutProcess(false);
            setIconHover(false);
        }

    }


    useEffect(() => {
        async function getUserData() {
            try {
                const response = await fetch("/api/user");
                if (!response.ok) {
                    console.log("response error");
                    dispatch(userLoggedIn(false))
                    dispatch(removeUser())
                } else {
                    const { success, userInfo } = await response.json();
                    console.log("response from HeaderUserCorner", userInfo);
                    dispatch(userLoggedIn(success))
                    dispatch(assignUser(userInfo))
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        getUserData()
    }, [user.loggedIn])



    return (
        <>
            {
                !user.loggedIn && <div className="w-full flex flex-row justify-center items-center gap-4 font-semibold">
                    <Link href="/login" className="flex flex-row justify-center items-center gap-2 hover:text-black border-none px-2 py-1">
                        <BiLogInCircle className="text-xl" /> <span>Login</span>
                    </Link>
                </div>
            }

            {
                user.loggedIn && <div className="relative">
                    {
                        user?.value?.userProfileColor && <div tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") userIconHoverFunc() }} className={`w-11 h-11 rounded-full ${user?.value?.userProfileColor} border border-black cursor-pointer overflow-hidden`} onClick={userIconHoverFunc}>
                            {
                                user?.value?.userProfilePicture && <Image src={`${user?.value?.userProfilePicture}`} alt="user" width={50} height={50} className="w-full h-full object-contain rounded-full" />
                            }
                        </div>
                    }

                    <div className={`absolute top-16 -left-24 p-3 bg-gray-100 rounded-md ${iconHover ? "block" : "hidden"} shadow-md border-2 select-none`}>

                        {user?.value?.userName && <h2 className='text-center text-gray-600 mb-1'> {user?.value?.userName} </h2>}

                        {user?.value?.userEmail && <p className='text-center text-gray-400 text-xs mb-3'> {user?.value?.userEmail} </p>}

                        <Link href={`/${user?.value?.role === "admin" ? "admin" : "dashboard"}/${user?.value?._id}/`} className='text-gray-600 text-xs p-1 my-1 cursor-pointer capitalize tracking-wider' onClick={() => setIconHover(false)}>dashbord</Link>

                        <button type="button" disabled={logoutProcess} className='w-full text-white font-semibold text-xs cursor-pointer text-center bg-red-500 mx-auto px-2 py-1 mt-3 uppercase tracking-wider disabled:opacity-50' onClick={logout}>{logoutProcess ? "Processing" : "logout"}</button>
                    </div>
                </div>
            }
        </>
    )
}

export default HeaderUserCorner