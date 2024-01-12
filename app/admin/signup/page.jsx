import CustomHeadding from '@/components/CustomHeadding'
import {SignupForm} from '@/components/Forms/SignupForm'
import Image from 'next/image'
import React from 'react'

const Signup = () => {
    return (
        <section className="w-full">
            <Image alt='logo' src="/images/logo.png" height={50} width={50} className='w-14 h-14 m-auto mt-5 rounded-full object-contain border-2 border-gray-600' />

            <CustomHeadding headdingTitle="Admin Signup" useFor="admin" />

            <section className="w-full xs:w-[300px] mx-auto">
                <SignupForm adminForm={true} />
            </section>
        </section>
    )
}

export default Signup