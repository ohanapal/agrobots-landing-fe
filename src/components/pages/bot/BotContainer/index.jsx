import botPagePlaceholder from '@/assets/images/pages/botpage/botpage-ph.png'
import avatarImg from '@/assets/temp/avatar.png'
import botImg from '@/assets/temp/bot.png'
import Spinner from '@/components/icons/Spinner'
import { Button } from '@/components/ui/button'
import { Img } from '@/components/ui/img'
import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { useGetThreadMessagesQuery, useStopThreadRunMutation } from '@/redux/features/botApi'
import styles from '@/styles/botStyles.module.scss'
import { rtkErrorMesage } from '@/utils/error/errorMessage'
import { ArrowDown, Copy, Loader2, PlayCircle, Send, StopCircle } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { runBotThread } from '../bot.helpers'
import { useThreadCallback } from '../bot.hooks'
import BotTopNav from '../BotTopNav'
import BotForm from './BotForm'
import MessageContent from './MessageContent'

export default function BotContainer({
  id,
  navbarOpen,
  openNavbar,
  message,
  setMessage,
  tempMessages,
  setTempMessages,
  isLoading,
  setisLoading,
  botData,
  current_run,
  setcurrent_run,
  userData,
  setHistoryOpen,
  setFaqsOpen,
  handlePlay,
  currentPlayingId,
  stopAudio,
  audioState
}) {
  const [showScrollButton, setShowScrollButton] = useState(false)

  const handleScroll = () => {
    const container = chatContainerRef.current
    if (container.scrollTop + container.clientHeight < container.scrollHeight - 100) {
      setShowScrollButton(true)
    } else {
      setShowScrollButton(false)
    }
  }

  useEffect(() => {
    const container = chatContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  // Refs
  const endOfMessagesRef = useRef(null)
  const chatContainerRef = useRef(null)

  const { data: messagesList, isLoading: isListLoading, isSuccess } = useGetThreadMessagesQuery(id, { skip: !id })

  useEffect(() => {
    if (isSuccess) {
      setTempMessages(messagesList?.messages || [])
    }
  }, [messagesList, isSuccess, setTempMessages, botData])

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [tempMessages])

  const convertHtmlToPlainText = html => {
    // Create a temporary element to parse HTML
    const temporaryDiv = document.createElement('div')
    temporaryDiv.innerHTML = html

    // Extract text content
    let plainText = temporaryDiv.textContent || temporaryDiv.innerText || ''

    // Remove multiple spaces and trim each line
    plainText = plainText
      .split('\n') // Split into lines
      .map(line => line.trim()) // Trim each line
      .filter(line => line !== '') // Remove empty lines
      .join('\n') // Join lines with a single newline

    return plainText
  }

  const copyToClipBoard = text => {
    const convertedPlainText = convertHtmlToPlainText(text)
    navigator.clipboard.writeText(convertedPlainText)
    toast.success('Copied to clipboard!')
  }

  const [stopRunFn, { isError, error }] = useStopThreadRunMutation()

  useEffect(() => {
    if (isError) {
      toast.error(rtkErrorMesage(error))
    }
  }, [isError, error])

  const { runId } = useSelector(state => state.bot)

  const stopRun = useCallback(() => {
    if (!runId) return
    stopRunFn({ run_id: runId, thread_id: id })
    setisLoading(false)
  }, [id, runId, setisLoading, stopRunFn])

  const { theme } = useTheme()
  const dispatch = useDispatch()

  const cb = useThreadCallback(id, handlePlay, botData)
  const handleSubmit = useCallback(
    (e, start = false) => {
      if (!start) {
        e.preventDefault()
        if (message === '') return
      }

      runBotThread({
        msg: start ? 'Start' : message,
        setisLoading,
        setTempMessages,
        tempMessages,
        id,
        cb,
        setMessage,
        setaudioURL: () => {},
        dispatch
      })
    },
    [cb, dispatch, id, message, setMessage, setTempMessages, setisLoading, tempMessages]
  )

  return (
    <main className={cn('h-screen w-full p-2', styles.bgSecondary)}>
      <BotTopNav
        navbarOpen={navbarOpen}
        openNavbar={openNavbar}
        isLoading={isLoading}
        botData={botData}
        theme={theme}
        setHistoryOpen={setHistoryOpen}
        setFaqsOpen={setFaqsOpen}
      />

      <div
        className={cn(
          'relative h-full overflow-auto bg-cover bg-center bg-fixed flex flex-col justify-between transition-all duration-500 w-full rounded-lg shadow-lg',
          styles.bgPrimary
        )}
      >
        {isLoading && (
          <div
            className={cn(
              'fixed right-5 top-5 z-50 px-3 py-2 border-2 rounded-md flex items-center gap-x-2',
              styles.bgSecondary,
              styles.textPrimary
            )}
          >
            <p className='text-sm font-medium'>{botData?.name} is thinking...</p>
            <Spinner className='animate-spin size-6' />
            <StopCircle className='size-6 cursor-pointer' onClick={stopRun} />
          </div>
        )}

        <div
          className={cn('relative flex gap-x-3 w-full h-full overflow-y-auto custom-scrollbar px-3 pt-14', {
            'sm:pt-5': navbarOpen
          })}
        >
          <div className='max-w-4xl w-full mx-auto'>
            <div className={cn('w-full pb-3')} ref={chatContainerRef}>
              {isListLoading ? (
                <div className='flex flex-col my-3 gap-y-5 px-5'>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className={cn('flex', { 'justify-end': index % 2, 'justify-start': !index % 2 })}>
                      <Skeleton className='w-2/3 h-40 mb-2' />
                    </div>
                  ))}
                </div>
              ) : tempMessages?.length ? (
                tempMessages?.map(
                  msg =>
                    msg?.content?.[0]?.text?.value?.length > 0 && (
                      <div
                        key={msg.id}
                        className={cn('flex flex-col gap-x-2 px-3 mx-1 gap-y-1 rounded-lg', {
                          [`${styles.rightMsg}`]: msg.role === 'user',
                          [`${styles.leftMsg} p-3 pb-0 mb-3`]: msg.role === 'assistant'
                        })}
                      >
                        {msg.role === 'assistant' ? (
                          <div className='flex items-start gap-x-3'>
                            <Img
                              src={botData?.bot_logo || botImg}
                              alt='Bot'
                              className='size-8 aspect-square object-cover mt-1 rounded-full'
                            />
                            <p className={cn(styles.textPrimary, 'pt-2 font-medium')}>{botData?.name}</p>
                          </div>
                        ) : (
                          <div className='flex items-start gap-x-3'>
                            <Img
                              src={botData?.user_logo || avatarImg}
                              alt='Avatar'
                              className='size-8 aspect-square object-cover mt-1 rounded-full'
                            />
                            <p className={cn(styles.textPrimary, 'pt-2 font-medium')}>{userData?.name || 'You'}</p>
                          </div>
                        )}

                        <div className='flex flex-col max-w-full'>
                          <div className='group'>
                            <div className={cn('my-1 text-sm rounded-lg pl-10')}>
                              <MessageContent msg={msg} />
                            </div>

                            {msg.role === 'assistant' && (
                              <div className='mb-3 ml-12 mt-1 flex gap-x-2 group-hover:opacity-100 opacity-0 transition-all duration-300 mhover:opacity-100'>
                                <Copy
                                  className={cn('cursor-pointer size-5', styles.textPrimary)}
                                  onClick={() => copyToClipBoard(msg?.content?.[0]?.text?.value)}
                                />
                                {currentPlayingId === msg.id ? (
                                  <StopCircle className='cursor-pointer size-5 text-red-500' onClick={stopAudio} />
                                ) : audioState[msg.id]?.isLoading ? (
                                  <Loader2 className={cn('cursor-pointer size-5 animate-spin', styles.textPrimary)} />
                                ) : (
                                  <PlayCircle
                                    className={cn('cursor-pointer size-5', styles.textPrimary)}
                                    onClick={() => handlePlay(msg)}
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                )
              ) : (
                <div className='max-w-xl w-full mx-auto h-[calc(100vh-100px)] flex flex-col items-center justify-center'>
                  <Img
                    src={botData?.cover_image || botPagePlaceholder}
                    alt='No messages'
                    className='w-full max-w-52 sm:max-w-80'
                  />

                  <div
                    className='w-full rounded-lg p-2.5 sm:p-5 flex flex-col justify-center items-center gap-y-3 mt-10 overflow-hidden relative'
                    style={{ boxShadow: '0 0 7px rgba(0, 0, 0, 0.1)' }}
                  >
                    <Typography variant='h5' className={cn('text-xl font-normal', styles.textPrimary)}>
                      {botData?.welcome_message || `Hello${userData?.name ? ` ${userData?.name}` : ''}, Welcome back!`}
                    </Typography>
                    <p className={cn('text-sm md:text-base', styles.textSecondary)}>{botData?.first_message}</p>

                    {botData?.show_start ? (
                      <Button onClick={() => handleSubmit(null, true)} className='px-10'>
                        Start
                      </Button>
                    ) : (
                      <form
                        className='w-full max-w-sm flex items-center gap-x-2 border rounded-lg p-1 shadow-md'
                        onSubmit={handleSubmit}
                      >
                        <input
                          type='text'
                          className={cn(
                            'w-full max-w-full h-10 border-none min-h-10 focus-visible:outline-0 resize-none rounded-xl px-2 py-1',
                            styles.textPrimary,
                            styles.bgPrimary
                          )}
                          placeholder='Ask anything...'
                          value={message}
                          onChange={e => setMessage(e.target.value)}
                          rows={1}
                        />
                        <Button type='submit' variant='default' size='icon'>
                          <Send className='size-5' />
                        </Button>
                      </form>
                    )}

                    <div className='glowing-wrapper' />
                  </div>
                </div>
              )}
              <div ref={endOfMessagesRef} />
              {showScrollButton && (
                <button
                  className='fixed bottom-36 left-1/2 transform -translate-x-1/2 p-2 rounded-full bg-gray-800 text-white shadow-md hover:bg-gray-700 transition-all'
                  onClick={scrollToBottom}
                >
                  <ArrowDown className='size-6' />
                </button>
              )}
            </div>
          </div>

          <div
            className={cn('glowing-wrapper-big left-1/2 -translate-x-1/2', {
              'left-[calc(50%+320px)] -translate-x-[calc(50%+160px)]': navbarOpen
            })}
          />
        </div>
        <BotForm
          id={id}
          message={message}
          setMessage={setMessage}
          tempMessages={tempMessages}
          setTempMessages={setTempMessages}
          isLoading={isLoading}
          setisLoading={setisLoading}
          scrollToBottom={scrollToBottom}
          current_run={current_run}
          setcurrent_run={setcurrent_run}
          navbarOpen={navbarOpen}
          handlePlay={handlePlay}
          botData={botData}
        />
      </div>
    </main>
  )
}

// Markdown for message response, abandoned
/*
<MarkdownRenderer
  className='markdown text-sm max-w-4xl'
  codeClassName='bg-rose-200 font-semibold px-1 py-0.5 text-rose-800 rounded-sm'
>
  {msg.content[0].text.value}
</MarkdownRenderer>
*/
