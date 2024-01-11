import Link from 'next/link'
import ContactForm from '@/components/Forms/ContactForm'
import { BsPhone, BsWhatsapp } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'
import CustomHeadding from '@/components/CustomHeadding'
import Image from 'next/image'


export const metadata = {
    title: "contact us - SRS WEB SOLUTIONS",
}

const Contact = () => {
    return (
        <>
            <Image alt='logo' src="/images/logo.png" height={50} width={50} className='w-14 h-14 m-auto mt-5 rounded-full object-contain border-2 border-gray-600' />

            <CustomHeadding headdingTitle="Get in Touch" />

            <section className="w-full xs:w-[300px] mx-auto mt-8">
                <ContactForm />
            </section>

            <section className="w-full md:w-11/12 flex justify-between my-10 px-5 gap-5 mx-auto p-3">
                <Link href="tel:+1234567890" className="flex items-center w-16 h-16 justify-center text-white bg-black bg-opacity-70 p-4 rounded-full hover:text-yellow-500 transition-colors text-9xl outline-none focus:text-yellow-500">
                    <BsPhone className="h-full w-full" />
                </Link>

                <Link href="mailto:info@example.com" className="flex items-center w-16 h-16 justify-center text-white bg-black bg-opacity-70 p-4 rounded-full hover:text-red-500 transition-colors text-9xl outline-none focus:text-red-500">
                    <AiOutlineMail className="h-full w-full" />
                </Link>

                <Link href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="flex items-center w-16 h-16 justify-center text-white bg-black bg-opacity-70 p-4 rounded-full hover:text-green-500 transition-colors text-9xl outline-none focus:text-green-500">
                    <BsWhatsapp className="h-full w-full" />
                </Link>
            </section>
        </>
    )
}

export default Contact