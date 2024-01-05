import CustomHeadding from '@/components/CustomHeadding'
import { SignupForm } from '@/components/Forms/SignupForm'
import Image from 'next/image'
import React from 'react'

export const metadata = {
    title: 'Signup - SRS WEB SOLUTIONS'
}

const Signup = () => {
    return (
        <>
            <section className="w-full">
                <Image alt='logo' src="/images/logo.png" height={35} width={35} className='m-auto mt-5 rounded-full object-contain border-2 border-gray-600' />

                <CustomHeadding headdingTitle="signup" />

                <SignupForm />
            </section>
        </>
    )
}

export default Signup