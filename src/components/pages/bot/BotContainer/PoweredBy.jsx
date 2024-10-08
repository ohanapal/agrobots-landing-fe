'use client'

import logoWhite from '@/assets/images/ui/logo-white.png'
import logoDark from '@/assets/images/ui/logo.png'
import { Img } from '@/components/ui/img'
import { useTheme } from 'next-themes'

export default function PoweredBy() {
  const { theme } = useTheme()
  return (
    <div className='fixed bottom-2 left-1/2 -translate-x-1/2 w-full max-w-5xl flex items-center justify-center px-5 gap-x-3'>
      <p className='text-xl font-medium'>Powered By</p>
      <Img src={theme === 'dark' && logoWhite ? logoWhite : logoDark} alt='logo' className='h-8 w-auto' />
    </div>
  )
}
