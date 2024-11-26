import ThemeSwitcher from '@/components/common/ThemeSwitcher'
import { Img } from '@/components/ui/img'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import styles from '@/styles/botStyles.module.scss'
import { History, Menu, PanelLeft } from 'lucide-react'

export default function BotTopNav({ navbarOpen, openNavbar, botData, theme, setHistoryOpen, setFaqsOpen }) {
  return (
    <div
      className={cn(
        'px-2 fixed top-2 left-2 right-2 z-50 flex justify-between items-center gap-x-2 rounded-tl-lg rounded-tr-lg backdrop-blur-lg h-12',
        styles.textPrimary,
        { 'sm:hidden': navbarOpen }
      )}
    >
      <div className='w-full flex items-center justify-start mr-3 h-full py-1'>
        {botData?.logo_light ? (
          <Img
            src={theme === 'dark' && botData?.logo_dark ? botData?.logo_dark : botData?.logo_light}
            alt='logo'
            className='h-7 sm:h-12 w-auto'
          />
        ) : (
          <Skeleton className='h-7 sm:h-12 w-40' />
        )}
      </div>
      <div className={cn('flex items-center gap-x-2')}>
        <Menu
          className={cn(styles.textPrimary, 'size-6 cursor-pointer sm:hidden block mr-2')}
          onClick={() => setFaqsOpen(true)}
        />
        <History
          className={cn(styles.textPrimary, 'size-6 cursor-pointer sm:hidden block')}
          onClick={() => setHistoryOpen(true)}
        />
        <PanelLeft className={cn('size-6 cursor-pointer hidden sm:block', styles.textPrimary)} onClick={openNavbar} />
        <ThemeSwitcher className={cn(styles.textPrimary, 'rounded-none border-none')} />
      </div>
    </div>
  )
}
