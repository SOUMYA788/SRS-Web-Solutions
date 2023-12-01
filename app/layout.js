import Header from '@/components/header'
import './globals.css'
import Footer from '@/components/footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomLoadingBar from '@/components/CustomLoadingBar'

export const metadata = {
  title: "SRS WEB SOLUTIONS",
   description: "India's number one web solutions.",
}

export default function RootLayout({ children }) {

  return (
      <html lang="en">
        <body>
        <main className="w-full container mx-auto">
          
          <CustomLoadingBar/>

          <ToastContainer
            position="bottom-center"
            autoClose={500}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="light"
          />

          <Header />
          {children}
          <Footer />

        </main>
      </body>
    </html>
  )
}
