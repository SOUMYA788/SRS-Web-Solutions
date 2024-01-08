import Header from '@/components/header'
import './globals.css'
import Footer from '@/components/footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomLoadingBar from '@/components/CustomLoadingBar'
import StoreProvider from '@/Providers/StoreProvider';

export const metadata = {
  title: "SRS WEB SOLUTIONS",
  description: "India's number one web developer organization.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="w-full container mx-auto min-h-screen relative">

          <CustomLoadingBar />

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

          <StoreProvider>
            <Header />
            {children}
            <Footer />
          </StoreProvider>
          
        </main>
      </body>
    </html>
  )
}
