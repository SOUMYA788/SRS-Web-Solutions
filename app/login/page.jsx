import CustomHeadding from '@/components/CustomHeadding'
import LoginForm from '@/components/Forms/LoginForm'
import Image from 'next/image'
import React from 'react'

export const metadata = {
    title: 'Login - SRS WEB SOLUTIONS'
}

const Login = () => {
    return (
        <>
            <Image alt='logo' src="/images/logo.png" height={35} width={35} className='m-auto mt-5 rounded-full object-contain border-2 border-gray-600'/>

            <CustomHeadding headdingTitle="login"/>

            <section className="w-full">
                <LoginForm/>
            </section>
        </>
    )
}

export default Login