import logo from '@/assets/images/ui/logo-white.png'
import { Img } from '@/components/ui/img'
import LLink from '@/components/ui/llink'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import SignupButtons from './SignupButtons'

export default function MobileNavbar({ navbarOpen, setnavbarOpen, t }) {
  return (
    <nav
      className={cn(
        'fixed top-0 right-0 bg-dark-gray w-[230px] h-screen p-5 flex flex-col items-center justify-between transition-all duration-500 z-50',
        {
          '-right-[230px]': !navbarOpen
        }
      )}
    >
      <div className='flex flex-col items-center justify-center w-full'>
        <div className='flex items-center gap-4 mb-5'>
          <X className='text-text-white opacity-0 w-8 h-8' />
          <LLink href='/'>
            <Img src={logo} alt='Wasal' sizes='250px' className='w-32' />
          </LLink>
          <X className='text-white cursor-pointer w-8 h-8' strokeWidth={1.5} onClick={() => setnavbarOpen(false)} />
        </div>

        <SignupButtons t={t} className='items-center justify-center' />

        <ul className='flex flex-col text-wite items-center w-full px-2 mt-10'>
          {t.navLinks?.map(link => (
            <li key={link.id}>
              <LLink href={link.href}>
                <button
                  className={cn('w-full rounded-lg text-text-tartiary hover:text-white p-3 text-left')}
                  onClick={() => setnavbarOpen(false)}
                >
                  {link.title}
                </button>
              </LLink>
            </li>
          ))}
        </ul>

        <ul className='flex flex-col items-center w-full px-2'>
          {t.navLinks.map(link => (
            <li key={link.id} className='w-full'>
              <LLink href={link.href}>
                <button
                  className={cn(
                    'w-full rounded-lg text-gray-light p-3 text-left hover:bg-bg-primary-secondary hover:text-text-white'
                  )}
                  onClick={() => setnavbarOpen(false)}
                >
                  {link.label}
                </button>
              </LLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
