import Header from '@/components/header'
import './globals.css'
import Footer from '@/components/footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomLoadingBar from '@/components/CustomLoadingBar'
import StoreProvider from '@/Providers/StoreProvider';
import CustomThemeProvider from '@/Providers/CustomThemeProvider';

export const metadata = {
  title: "SRS WEB SOLUTIONS",
  description: "India's number one web developer organization.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CustomThemeProvider>

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

            <main className="w-full mx-auto min-h-screen relative dark:bg-slate-800 p-2">
              <Header />
              {children}
              <Footer />
            </main>

          </StoreProvider>

        </CustomThemeProvider>

      </body>
    </html>
  )
}
