import CustomHeadding from '@/components/CustomHeadding'
import LoginForm from '@/components/Forms/LoginForm'
import Image from 'next/image'
import React from 'react'

const AdminLogin = () => {
    return (
        <div className="h-full">
        <Image alt='logo' src="/images/logo.png" height={40} width={40} className='m-auto mt-5 rounded-full object-contain border-2 border-gray-600'/>

        <CustomHeadding headdingTitle="Admin Login" useFor="admin"/>

        <section className="w-full">
            <LoginForm adminForm={true}/>
        </section>
    </div>
    )
}

export default AdminLogin