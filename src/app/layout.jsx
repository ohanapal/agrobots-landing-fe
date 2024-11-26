import ReduxProvider from '@/lib/redux/redux-provider'
import { ThemeProvider } from '@/lib/theme/ThemeProvider'
import '@/styles/globals.scss'
import 'animate.css/animate.css'
import { Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

export const metadata = {
  title: 'BLDR AI Chatbot',
  description: 'Product of Argobot AI Solutions'
}

export default async function RootLayout({ children }) {
  return (
    <html lang='en'>
      <ReduxProvider>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
          <body className={poppins.className}>
            <Toaster position='top-center' />
            <main>{children}</main>
            <div id='modal-container' />
          </body>
        </ThemeProvider>
      </ReduxProvider>
    </html>
  )
}
