'use client'

import logo from '@/assets/images/ui/logo.png'
import SignupButtons from '@/components/common/Navbar/SignupButtons'
import { cn } from '@/lib/utils'
import { AlignRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Img } from '../../ui/img'
import LLink from '../../ui/llink'
import ThemeSwitcher from '../ThemeSwitcher'
import MobileNavbar from './MobileNavbar'
//import SignupButtons from './SignupButtons'

export default function Navbar({ t }) {
  const [navbarOpen, setnavbarOpen] = useState(false)
  const [isTop, setIsTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setIsTop(scrollTop === 0)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <header
        className={cn('fixed w-full top-0 left-0 right-0 h-20 backdrop-blur-lg z-40', {
          'bg-white/50 dark:bg-black/50': !isTop
        })}
      >
        <nav className='container flex items-center justify-between h-full'>
          <LLink href='/'>
            <Img src={logo} alt='Argobots' className='w-auto h-1/2' />
          </LLink>
          {/* <ul className='hidden lg:flex gap-x-5 text-text-secondary font-medium'>
            {t.navLinks?.map(link => (
              <li key={link.id}>
                <LLink href={link.href}>{link.title}</LLink>
              </li>
            ))}
          </ul> */}

          <div className='flex items-center gap-x-3'>
            <SignupButtons t={t} className='hidden lg:flex' />

            <ThemeSwitcher />

            <AlignRight
              className='inline-block lg:hidden w-6 h-6 text-text-white cursor-pointer'
              onClick={() => setnavbarOpen(!navbarOpen)}
            />
          </div>
        </nav>
      </header>
      <MobileNavbar navbarOpen={navbarOpen} setnavbarOpen={setnavbarOpen} t={t} />
    </>
  )
}
