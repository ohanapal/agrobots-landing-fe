'use client'

import { Img } from '@/components/ui/img'
import { cn } from '@/lib/utils'
import { useGetThreadMessagesQuery } from '@/redux/features/botApi'
import styles from '@/styles/botStyles.module.scss'
import { X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useDispatch } from 'react-redux'
import { runBotThread } from './bot.helpers'

export default function BotMobileNav({
  navbarOpen,
  setnavbarOpen,
  id,
  setMessage,
  tempMessages,
  setTempMessages,
  setisLoading,
  faqs,
  botData
}) {
  const dispatch = useDispatch()
  const { refetch } = useGetThreadMessagesQuery(id)
  const { theme } = useTheme()
  return (
    <nav
      className={cn(
        'fixed top-0 right-0 bg-dark-gray w-[330px] h-svh flex flex-col items-center justify-between transition-all duration-500 z-50',
        {
          '-right-[330px]': !navbarOpen
        },
        styles.rightMsg
      )}
    >
      <div className='flex flex-col items-center justify-center w-full'>
        <div className='w-full p-3 flex items-center justify-between gap-4 mb-5'>
          <X className='text-text-white opacity-0 w-8 h-8 select-none' />
          <Img
            src={theme === 'dark' && botData?.logo_dark ? botData?.logo_dark : botData?.logo_light}
            alt='logo'
            className='h-12 w-auto'
          />
          <X className='text-white cursor-pointer w-8 h-8' strokeWidth={1.5} onClick={() => setnavbarOpen(false)} />
        </div>

        <div className='h-[calc(100vh-92px)] overflow-y-auto pb-5 w-full'>
          <div className='w-full flex-col gap-y-5 py-4 my-5 self-start'>
            {faqs?.data?.map(faq => (
              <p
                key={faq?._id}
                className='font-medium cursor-pointer border-b px-3 py-2'
                onClick={() => {
                  setMessage(faq?.question)
                  runBotThread({
                    msg: faq?.question,
                    setisLoading,
                    setTempMessages,
                    tempMessages,
                    id,
                    cb: refetch,
                    setMessage,
                    dispatch
                  })
                  setnavbarOpen(false)
                }}
              >
                {faq?.question}
              </p>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
