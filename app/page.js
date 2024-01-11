import Image from 'next/image'
import Link from 'next/link'
import { BsWhatsapp, BsBrush, BsGearWideConnected } from 'react-icons/bs'
import { BiRevision, BiSupport, BiLogoReact, BiLogoWordpress } from 'react-icons/bi'
import Card from '@/components/card'
import CustomHeadding from '@/components/CustomHeadding'
import { OUR_SERVICES } from '@/constants'

export default function Home() {

  return (
    <>
      <section className="sm:relative w-full">
        <Image
          alt="main_banner"
          quality={100}
          priority={true}
          src="/images/main_bg.png"
          width={500}
          height={500}
          className="w-full h-full object-cover hidden sm:flex"
        />

        <Link href="https://wa.me/+919836567743" className="w-20 h-20 fixed sm:absolute bottom-2 right-2 backdrop-blur-sm uppercase transition rounded-full bg-[rgba(255,255,255,0.5)] dark:bg-slate-800 dark:text-slate-400 hover:bg-[rgba(0,0,0,0.5)] hover:text-white overflow-hidden">
          <BsWhatsapp className="w-full h-full p-3 sm:p-5 rounded-full" />
        </Link>

      </section>

      <section className="sm:my-10 mb-0 text-gray-600 body-font">

        <div className="py-12 sm:p-1">
          <h2 className={`sm:m-4 mb-0 text-base sm:text-3xl dark:text-slate-100 font-bold uppercase text-center `}>
            welcome to srs web solutions
          </h2>

          <p className="mt-3 text-center italic text-slate-500 dark:text-slate-400 capitalize sm:hidden">build your web apps with us</p>
  
          <div className="hr h-[1px] w-3/4 sm:w-72 mx-auto my-2 bg-slate-300 dark:bg-slate-500 rounded-full" />
        </div>

        <div className="w-full">
          <h2 className="dark:text-white px-5 sm:hidden"> Our Services and Technologies We Work With  </h2>
          <div className="mx-auto flex flex-wrap gap-8 p-5">
          {OUR_SERVICES.map(service => (
            <Card key={service?.id} cardContent={service} text_center={false} className="items-center sm:w-72 sm:h-72 md:w-[30%] flex-row sm:flex-col"/>
          ))}
          </div>
        </div>
      </section>
    </>
  )
}
