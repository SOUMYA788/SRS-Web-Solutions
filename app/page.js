import Image from 'next/image'
import Link from 'next/link'
import { BsWhatsapp, BsBrush, BsGearWideConnected } from 'react-icons/bs'
import { BiRevision, BiSupport, BiLogoReact, BiLogoWordpress } from 'react-icons/bi'
import Card from '@/components/card'
import CustomHeadding from '@/components/CustomHeadding'

export default function Home() {
  const homeInfo = [
    {
      id: "service_01",
      Img: BsBrush,
      title: "service",
      name: "web design",
      desc: "Elevate your brand by creating awesome websites that look greet and work smoothly on phones, tablets, and computers. Your brand will shine everywhere!"
    },
    {
      id: "service_02",
      Img: BsGearWideConnected,
      title: "service",
      name: "web development",
      desc: "Boost your brand with expert web development. We create dynamic, heigh-performance websites to elevate your own presence."
    },
    {
      id: "service_03",
      Img: BiRevision,
      title: "service",
      name: "Design Refinement",
      desc: "Revise your design until it's perfect!<br/>We offer 5 complimentary revisions, and thereafter, benifit from unlimited revisions at an annual fee of ₹999 for ultimate satisfaction."
    },
    {
      id: "service_04",
      Img: BiSupport,
      title: "service",
      name: "Friendly Support",
      desc: "If you have any issue with our website, our team always welcome you within our working hours 09:00pm to 07:00pm."
    },
    {
      id: "tech_01",
      Img: BiLogoWordpress,
      title: "technology",
      name: "wordpress",
      desc: "WordPress first release with target for bloggers, but nowdays it uses in every industry. A WordPress Developer is a type of developer"
    },
    {
      id: "tech_02",
      Img: BiLogoReact,
      title: "technology",
      name: "react",
      desc: "React is front end web app technology, but it has few problems on SEO, that's why under the hood we use Next.js."
    },
  ]
  
  return (
    <>
      <section className="relative w-full">
        <Image
          alt="main_banner"
          quality={100}
          src="/images/main_bg.png"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />

        <Link href="https://wa.me/+919836567743" className="absolute bottom-2 right-2 p-5 backdrop-blur-sm text-5xl uppercase transition rounded-full bg-[rgba(255,255,255,0.5)] hover:bg-[rgba(0,0,0,0.5)] hover:text-white">
          <BsWhatsapp />
        </Link>

      </section>

      <section className="my-10 mb-0 text-gray-600 body-font">
        <CustomHeadding headdingTitle="welcome to srs web solutions"/>
        
        <div className="mx-auto flex flex-wrap gap-8 p-5">
          <Card contentArray={homeInfo} text_center={false} />
        </div>
      </section>
    </>
  )
}
