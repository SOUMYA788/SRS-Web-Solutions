import Link from 'next/link'
import React from 'react'
import Card from '@/components/card'

export const metadata = {
  title: 'About - SRS WEB SOLUTIONS'
}

const About = () => {

  const valuesArr = [
    {
      id: "value_01",
      name: "innovation",
      desc: "Innovation is what we're all about. It means coming up with cool and creative solutions that make every project unique and exciting. We like pushing boundaries and thinking outside the box."
    },
    {
      id: "value_02",
      name: "integrity",
      desc: "Integrity is super important to us. It's all about being honest and transparent in everything we do. We believe that trust is the foundation of good relationships, whether it's with our clients or within our own team."
    },
    {
      id: "value_03",
      name: "customer satisfaction",
      desc: "Making our clients really happy is our main goal. We don't just want to meet their expectations; we want to go above and beyond. We love understanding what they need and delivering solutions that make them super happy."
    },
    {
      id: "value_04",
      name: "collaboration",
      desc: "We believe that working together as a team to create awesome things. If everyone brings their ideas to the table, we can make something truly amazing."
    }
  ]


  const ourTeam = [
    {
      id: "team_01",
      name: "Soumya",
      desc: "Lead Developer"
    },
    {
      id: "team_02",
      name: "Ranit",
      desc: "Lead Designer"
    },
    {
      id: "team_03",
      name: "Subhro",
      desc: "Sales Head"
    },
  ]


  return (
    <>
      {/* <p className="text-sm">Crafting digital experiences since 20XX</p> */}

      <section className="w-full">
        <h2 className="text-3xl text-center my-1 py-4 bg-slate-200 text-slate-400 uppercase animate-slideup">about us</h2>
        <p className="text-gray-700 mt-3">
          Hello there! Our story is like an exciting journey into the world of creating awesome websites. We are a passionate team dedicated to creating exceptional digital solutions. Our mission is to deliver high-quality products that make a positive impact. Whether you're a local or dreaming big, we're here to make websites that are just right for you. Our designed websites that not only work well but also look fantastic, just the way you want.
        </p>

        <p className="text-gray-700 my-2">
          Even though we're new, we love trying out new things. Let's bring a modern touch to your online presence.
        </p>

        <p className="text-gray-700 my-2">
          Ready to join our web adventure? Feel free to <Link href="/contact" className="font-semibold text-black border-slate-500 outline-none p-1 focus:border-b-2"> contact us </Link>.
        </p>

      </section>

      <section className="mt-16 mb-[44px]">
        <h2 className="text-3xl text-center my-1 py-4 bg-slate-200 text-slate-400 uppercase animate-slideup">Our Values</h2>
        
        <p className="text-gray-700 my-2">
          Our values are like our compass. They guide us in everything we do, making sure we're always innovative, honest, focused on making clients happy, and working together as a team.
        </p>

        <div className="mt-6 mx-auto flex flex-wrap gap-[5%] px-3">
          {
            <Card contentArray={valuesArr} text_center={true} cardHeight="230px"/>
          }
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl text-center my-1 py-4 bg-slate-200 text-slate-400 uppercase animate-slideup">Meet Our Team</h2>
        <div className={`flex justify-between flex-wrap p-2`}>
          {
            <Card contentArray={ourTeam} text_center={false} cardHeight="230px"/>
          }
        </div>
      </section>

    </>
  )
}

export default About