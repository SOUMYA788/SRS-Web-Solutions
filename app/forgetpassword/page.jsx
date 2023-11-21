import CustomButton from '@/components/FormElements/CustomButton'
import CustomHeadding from '@/components/CustomHeadding'
import CustomInput from '@/components/FormElements/CustomInput'
import ForgetPasswordForm from '@/components/Forms/ForgetPasswordForm'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const metadata = {
    title: 'Forget Password - SRS WEB SOLUTIONS'
}

const Page = () => {
    return (
        <>
            <section className="w-full">
                <Image alt='logo' src="/images/logo.png" height={35} width={35} className='m-auto mt-5 rounded-full object-contain border-2 border-gray-600' />

                <CustomHeadding headdingTitle={"Forget Your Password"} />

                <ForgetPasswordForm/>


            </section>
        </>
    )
}

export default Page