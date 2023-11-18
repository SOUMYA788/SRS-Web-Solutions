import Header from '@/components/header'
import './globals.css'
import Footer from '@/components/footer'

export const metadata = {
  title: "SRS WEB SOLUTIONS",
  description: "India's number one web solutions.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="w-full container mx-auto min-h-full">
          <Header/>
          {children}
          <Footer/>
        </main>
      </body>
    </html>
  )
}
