'use client'
import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Header from '@/components/header'
import './globals.css'
import Footer from '@/components/footer'
import LoadingBar from 'react-top-loading-bar'

// export const metadata = {
//   title: "SRS WEB SOLUTIONS",
//   description: "India's number one web solutions.",
// }

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [progress, setProgress] = useState(75)

  useEffect(() => {
    setTimeout(() => {
      setProgress(1000)
    }, 500);
  }, [pathname, searchParams])

  return (
    <html lang="en">
      <body>
        <main className="w-full container mx-auto min-h-full">
        <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
          <Header/>
          {children}
          <Footer/>
        </main>
      </body>
    </html>
  )
}
