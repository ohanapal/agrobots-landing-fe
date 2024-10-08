'use client'

import { useCreateThreadMutation, useGetBotFAQQuery, useGetBotUsingSlugQuery } from '@/redux/features/botApi'
import { rtkErrorMesage } from '@/utils/error/errorMessage'
import { getCookie, setCookie } from 'cookies-next'
import { useTheme } from 'next-themes'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import BotContainer from './BotContainer'
import BotMobileNav from './BotMobileNav'

export default function BotPageComponent() {
  const [bot_id, setbot_id] = useState(undefined)
  const [thread_id, setthread_id] = useState(undefined)

  const { slug } = useParams()
  const { data, isSuccess } = useGetBotUsingSlugQuery(slug)

  const [createThread, { isSuccess: isThreadSuccess, isError, error, data: threadData }] = useCreateThreadMutation()

  // Setting the bot variables only for bot page
  const { theme } = useTheme()
  useEffect(() => {
    if (isSuccess) {
      setbot_id(data?.data?._id)

      if (theme === 'light') {
        document.documentElement.style.setProperty('--bot-primary-color', data?.data?.primary_color)
        document.documentElement.style.setProperty('--bot-secondary-color', data?.data?.secondary_color)
        document.documentElement.style.setProperty('--bot-font-color', data?.data?.font_color)
      } else if (theme === 'dark') {
        document.documentElement.style.setProperty('--bot-primary-color', data?.data?.primary_color_dark)
        document.documentElement.style.setProperty('--bot-secondary-color', data?.data?.secondary_color_dark)
        document.documentElement.style.setProperty('--bot-font-color', data?.data?.font_color_dark)
      }
    }
  }, [isSuccess, data, theme])

  const { data: faqs, isLoading: isFaqLoading } = useGetBotFAQQuery(bot_id)

  const localBotData = getCookie('botData')

  useEffect(() => {
    if (localBotData && bot_id) {
      const botDataParsed = JSON.parse(localBotData)
      const localBotId = botDataParsed.bot_id

      if (localBotId === bot_id) setthread_id(botDataParsed.thread_id)
      else createThread({ bot_id, thread_id: 'new' })
    } else if (!localBotData && bot_id) createThread({ bot_id, thread_id: 'new' })
  }, [localBotData, bot_id, createThread])

  const [navbarOpen, setnavbarOpen] = useState(false)

  // Bot States
  const [message, setMessage] = useState('')
  const [isLoading, setisLoading] = useState('')
  const [tempMessages, setTempMessages] = useState([])
  const [current_run, setcurrent_run] = useState(undefined)

  useEffect(() => {
    if (isThreadSuccess && bot_id) {
      const newThreadId = threadData?.thread?._id
      setthread_id(newThreadId)
      setCookie('botData', JSON.stringify({ bot_id, thread_id: newThreadId }))
    }

    if (isError) toast.error(rtkErrorMesage(error))
  }, [isThreadSuccess, isError, error, threadData, bot_id])

  // if (!bot_id) {
  //   return (
  //     <div className='w-full h-screen flex items-center justify-center gap-x-3'>
  //       <Typography variant='h3' className='font-normal italic'>
  //         Loading Bot
  //       </Typography>
  //       <Loader className='size-9 animate-spin' />
  //     </div>
  //   )
  // }

  return (
    <div>
      <BotContainer
        id={thread_id}
        botData={data?.data}
        setnavbarOpen={setnavbarOpen}
        message={message}
        setMessage={setMessage}
        tempMessages={tempMessages}
        setTempMessages={setTempMessages}
        isLoading={isLoading}
        setisLoading={setisLoading}
        faqs={faqs}
        isFaqLoading={isFaqLoading}
        current_run={current_run}
        setcurrent_run={setcurrent_run}
      />
      <BotMobileNav
        id={thread_id}
        botData={data?.data}
        navbarOpen={navbarOpen}
        setnavbarOpen={setnavbarOpen}
        message={message}
        setMessage={setMessage}
        tempMessages={tempMessages}
        setTempMessages={setTempMessages}
        isLoading={isLoading}
        setisLoading={setisLoading}
        faqs={faqs}
        isFaqLoading={isFaqLoading}
        setcurrent_run={setcurrent_run}
      />
    </div>
  )
}
