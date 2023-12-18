import CustomHeadding from '@/components/CustomHeadding'
import SignupForm from '@/components/Forms/SignupForm'
import Image from 'next/image'
import React from 'react'

const Signup = () => {
    return (
        <section className="w-full">
            <Image alt='logo' src="/images/logo.png" height={35} width={35} className='m-auto mt-5 rounded-full object-contain border-2 border-gray-600' />

            <CustomHeadding headdingTitle="Admin Signup" useFor="admin" />

            <SignupForm adminForm={true}/>
        </section>
    )
}

export default Signup