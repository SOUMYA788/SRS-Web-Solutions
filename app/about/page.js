import Link from 'next/link'
import React from 'react'
import Card from '@/components/card'
import { OUR_TEAM, OUR_VALUES } from '@/constants'

export const metadata = {
  title: 'About - SRS WEB SOLUTIONS'
}

const About = () => {

  return (
    <>
      {/* <p className="text-sm">Crafting digital experiences since 20XX</p> */}

      <section className="w-full text-gray-700 dark:text-slate-400">
        <h2 className="text-3xl text-center my-1 py-4 bg-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:border uppercase animate-slideup">about us</h2>
        <p className="mt-3">
          Hello there! Our story is like an exciting journey into the world of creating awesome websites. We are a passionate team dedicated to creating exceptional digital solutions. Our mission is to deliver high-quality products that make a positive impact. Whether you're a local or dreaming big, we're here to make websites that are just right for you. Our designed websites that not only work well but also look fantastic, just the way you want.
        </p>

        <p className="my-2">
          Even though we're new, we love trying out new things. Let's bring a modern touch to your online presence.
        </p>

        <p className="my-2">
          Ready to join our web adventure? Feel free to <Link href="/contact" className="font-semibold text-black dark:text-slate-300 border-slate-500 outline-none p-1 focus:border-b-2"> contact us </Link>.
        </p>

      </section>

      <section className="mt-16 mb-[44px] text-gray-700 dark:text-slate-400">
        <h2 className="text-3xl text-center my-1 py-4 bg-slate-200 dark:bg-slate-800 uppercase dark:border-slate-700 dark:border animate-slideup">Our Values</h2>

        <p className="my-2">
          Our values are like our compass. They guide us in everything we do, making sure we're always innovative, honest, focused on making clients happy, and working together as a team.
        </p>

        <div className="flex flex-col xs:flex-row xs:justify-between flex-wrap gap-2 sm:p-3 sm:gap-3">
          {
            OUR_VALUES.map(data => (
              <Card key={data?.id} cardContent={data} text_center={true} className="h-[336] w-full xs:w-4/5 sm:w-[45%] md:w-[30%] mx-auto sm:mx-0 my-3" />
            ))
          }
        </div>
      </section>

      <section className="mb-16 text-gray-700 dark:text-slate-400">
        <h2 className="text-3xl text-center my-1 py-4 bg-slate-200 dark:bg-slate-800 uppercase animate-slideup dark:border-slate-700 dark:border">Meet Our Team</h2>
        <div className={`flex flex-col xs:flex-row xs:justify-between flex-wrap p-2 sm:p-3 gap-2`}>
          {
            OUR_TEAM.map(data => (
              <Card key={data?.id} cardContent={data} text_center={false} className="w-full xs:w-fit sm:flex-1 mx-auto sm:mx-0 gap-2 sm:gap-3" />
            ))
          }
        </div>
      </section>

    </>
  )
}

export default About