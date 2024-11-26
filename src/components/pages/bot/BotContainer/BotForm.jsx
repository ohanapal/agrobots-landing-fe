'use client'

import logoWhite from '@/assets/images/ui/logo-white.png'
import logoDark from '@/assets/images/ui/logo.png'
import { Button } from '@/components/ui/button'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuTrigger
// } from '@/components/ui/dropdown-menu'
import { Img } from '@/components/ui/img'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
//import styles from '@/styles/botStyles.module.scss'
import styles from '@/styles/botStyles.module.scss'
import { Send } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useDispatch } from 'react-redux'
import AudioRecorder from '../AudioRecorder'
import { runBotThread } from '../bot.helpers'
import { useThreadCallback } from '../bot.hooks'
import FileUploader from '../FileUploader'

export default function BotForm({
  id,
  message,
  setMessage,
  tempMessages,
  setTempMessages,
  isLoading,
  setisLoading,
  setaudioURL,
  handlePlay,
  botData
}) {
  const dispatch = useDispatch()

  const cb = useThreadCallback(id, tempMessages, handlePlay, botData)
  const handleSubmit = e => {
    e.preventDefault()
    if (message === '') return

    runBotThread({
      msg: message,
      setisLoading,
      setTempMessages,
      tempMessages,
      id,
      cb,
      setMessage,
      setaudioURL,
      dispatch
    })
  }

  const { theme } = useTheme()

  return (
    <div
      className={cn('w-full pb-2 px-3 backdrop-blur-lg transition-all duration-500', { hidden: !tempMessages?.length })}
    >
      <div
        className={cn(
          'max-w-4xl mx-auto flex items-center gap-x-3 pr-1 border-0 dark:border rounded-xl',
          styles.bgPrimary,
          styles.borderSecondary
        )}
      >
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-center justify-between rounded-xl gap-x-3 w-full'
          style={{ boxShadow: '0 0 7px rgba(0, 0, 0, 0.1)' }}
        >
          <Textarea
            type='text'
            containerClassName={cn('w-full max-w-full min-h-20 rounded-xl', styles.bgPrimary)}
            className={cn(
              'w-full max-w-full h-full border-none focus-visible:ring-0 resize-none rounded-xl',
              styles.textPrimary,
              styles.bgPrimary
            )}
            placeholder='Ask anything...'
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={1}
            onKeyDown={e => (e.key === 'Enter' && !e.shiftKey ? handleSubmit(e) : null)}
          />

          <div className='mx-auto w-[calc(100%-16px)] max-w-full h-[1px] bg-light-gray' />

          <div className='flex items-center justify-between w-full gap-x-2 px-2 py-1'>
            <div className='flex items-center gap-x-2'>
              <AudioRecorder
                id={id}
                message={message}
                setMessage={setMessage}
                tempMessages={tempMessages}
                setTempMessages={setTempMessages}
                isLoading={isLoading}
                setisLoading={setisLoading}
                setaudioURL={setaudioURL}
                handlePlay={handlePlay}
                botData={botData}
              />
              <FileUploader id={id} />
            </div>

            <Button type='submit' variant='default'>
              Send Message <Send className='size-5 ml-2' />
            </Button>
          </div>
        </form>

        {/* <DropdownMenu>
          <DropdownMenuTrigger className='inline-block md:hidden'>
            <div className={cn('border-2 p-2.5 rounded-lg', styles.borderPrimary)}>
              <Plus className={cn('size-7', styles.textPrimary)} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={cn('bg-transparent min-w-16 border-2', styles.borderPrimary)}>
            <DropdownMenuLabel>
              <AudioRecorder
                id={id}
                message={message}
                setMessage={setMessage}
                tempMessages={tempMessages}
                setTempMessages={setTempMessages}
                isLoading={isLoading}
                setisLoading={setisLoading}
                setaudioURL={setaudioURL}
              />
            </DropdownMenuLabel>
            <DropdownMenuItem>
              <FileUploader id={id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
      <div className='w-full max-w-5xl mx-auto flex items-center justify-center px-5 gap-x-3 pt-3'>
        <p className='text-sm font-medium'>Powered By</p>
        <Img src={theme === 'dark' && logoWhite ? logoWhite : logoDark} alt='logo' className='h-6 w-auto' />
      </div>
    </div>
  )
}
