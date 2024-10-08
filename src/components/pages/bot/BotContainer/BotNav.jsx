'use client'

import ThemeSwitcher from '@/components/common/ThemeSwitcher'
import { Img } from '@/components/ui/img'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import styles from '@/styles/botStyles.module.scss'
import { AlignRight } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function BotNav({ botData, setnavbarOpen }) {
  const { theme } = useTheme()
  return (
    <nav className='fixed top-0 left-0 w-full h-24 z-20 px-8 xl:px-10'>
      <div className='flex items-center justify-between h-full'>
        {botData ? (
          <Img
            src={theme === 'dark' && botData?.logo_dark ? botData?.logo_dark : botData?.logo_light}
            alt='logo'
            className='h-1/2 w-auto'
          />
        ) : (
          <Skeleton className='w-28 h-12 rounded-lg' />
        )}
        <div className='flex items-center gap-x-2'>
          <div className={cn('size-10 flex items-center justify-center rounded-full', styles.rightMsg)}>
            <ThemeSwitcher />
          </div>
          <AlignRight
            strokeWidth={1.5}
            className={cn('size-10 cursor-pointer inline-block lg:hidden', styles.textPrimary)}
            onClick={() => setnavbarOpen(prev => !prev)}
          />
        </div>
      </div>
    </nav>
  )
}
