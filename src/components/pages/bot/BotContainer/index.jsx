import avatarImg from '@/assets/temp/avatar.png'
import botImg from '@/assets/temp/bot.png'
import Spinner from '@/components/icons/Spinner'
import { Img } from '@/components/ui/img'
import { Skeleton } from '@/components/ui/skeleton'
import { API_URL } from '@/configs'
import { axiosInstance } from '@/lib/axios/interceptor'
import { cn } from '@/lib/utils'
import { useGetThreadMessagesQuery, useStopThreadRunMutation } from '@/redux/features/botApi'
import styles from '@/styles/botStyles.module.scss'
import { rtkErrorMesage } from '@/utils/error/errorMessage'
import { ArrowDown, Copy, Loader2, PlayCircle, StopCircle } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { runBotThread } from '../bot.helpers'
import BotForm from './BotForm'
import BotNav from './BotNav'
import PoweredBy from './PoweredBy'

export default function BotContainer({
  id,
  setnavbarOpen,
  message,
  setMessage,
  tempMessages,
  setTempMessages,
  isLoading,
  setisLoading,
  faqs,
  isFaqLoading,
  botData,
  current_run,
  setcurrent_run
}) {
  const dispatch = useDispatch()
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
  const audioRef = useRef() // Initialize Audio object in ref
  const endOfMessagesRef = useRef(null)
  const chatContainerRef = useRef(null)

  const [audioState, setAudioState] = useState({}) // Store audio URLs and their loading state
  const [currentPlayingId, setCurrentPlayingId] = useState(null) // Track currently playing audio

  const { data: messagesList, isLoading: isListLoading, isSuccess, refetch } = useGetThreadMessagesQuery(id)

  useEffect(() => {
    const firstMessage = {
      id: `temp-${Date.now()}`,
      role: 'assistant',
      content: [{ text: { value: botData?.first_message } }]
    }

    if (isSuccess) {
      if (botData?.first_message && !messagesList?.messages?.length) setTempMessages([firstMessage])
      else setTempMessages(messagesList?.messages || [])
    }
  }, [messagesList, isSuccess, setTempMessages, botData])

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [tempMessages])

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setCurrentPlayingId(null) // Stop tracking the playing message
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      // When the audio finishes playing, reset the current playing state
      const handleAudioEnded = () => {
        setCurrentPlayingId(null)
      }

      const audio = audioRef.current

      audio.addEventListener('ended', handleAudioEnded)

      // Clean up the event listener when the component unmounts
      return () => {
        if (audio) {
          audio.removeEventListener('ended', handleAudioEnded)
        }
      }
    }
  }, [])

  const prepareAudio = async (message, msgId) => {
    if (audioState[msgId]?.url) {
      // If audio is already prepared, just play it
      setCurrentPlayingId(msgId)
      audioRef.current.src = audioState[msgId].url // Set the audio source
      playAudio()
      return
    }

    setAudioState(prev => ({ ...prev, [msgId]: { isLoading: true } }))

    try {
      const res = await axiosInstance.post(`${API_URL}/audios/text-to-speech`, { message }, { responseType: 'blob' })

      const url = URL.createObjectURL(res.data)
      setAudioState(prev => ({ ...prev, [msgId]: { url, isLoading: false } }))
      setCurrentPlayingId(msgId)

      audioRef.current.src = url // Set the audio source after fetching
      playAudio()
    } catch (error) {
      setAudioState(prev => ({ ...prev, [msgId]: { isLoading: false } }))
      console.error(error)
    }
  }

  const handlePlay = msg => {
    if (currentPlayingId === msg.id) {
      stopAudio()
    } else {
      prepareAudio(msg.content[0].text.value, msg.id)
    }
  }

  const copyToClipBoard = text => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const handleFAQTrigger = faq => {
    setMessage(faq?.question)
    runBotThread({
      msg: faq?.question,
      setisLoading,
      setTempMessages,
      tempMessages,
      id,
      cb: () => {
        refetch()
        stopAudio()
      },
      setMessage,
      dispatch
    })
  }

  const [stopRunFn, { isError, error }] = useStopThreadRunMutation()

  useEffect(() => {
    if (isError) {
      toast.error(rtkErrorMesage(error))
    }
  }, [isError, error])

  const { runId } = useSelector(state => state.bot)

  const stopRun = () => {
    if (!runId) return
    stopRunFn({ run_id: runId, thread_id: id })
    setisLoading(false)
  }

  const { theme } = useTheme()

  return (
    <main
      className='relative h-screen bg-cover bg-center pl-0 lg:pl-8 xl:pl-10'
      style={{ backgroundImage: `url(${theme === 'dark' && botData?.bg_dark ? botData?.bg_dark : botData?.bg_light})` }}
    >
      {isLoading && (
        <div
          className={cn(
            'fixed right-5 top-5 z-50 px-4 py-3 border-2 rounded-xl flex items-center gap-x-2',
            styles.rightMsg
          )}
        >
          <p className='text-xl font-semibold'>{botData?.name} is thinking...</p>
          <Spinner className='animate-spin size-9' />
          <StopCircle className='size-9 cursor-pointer' onClick={stopRun} />
        </div>
      )}

      <BotNav botData={botData} setnavbarOpen={setnavbarOpen} />
      <div className='pt-24 pb-2 h-[calc(100vh-100px)] overflow-hidden relative flex gap-x-3'>
        {isFaqLoading ? (
          <Skeleton className='w-72 h-96' />
        ) : (
          <div
            className={cn(
              'w-72 max-h-full min-h-96 overflow-y-auto hidden lg:inline-flex flex-col gap-y-5 px-3 py-4 rounded-xl self-start border-2 custom-scrollbar',
              styles.rightMsg,
              styles.border
            )}
          >
            {faqs?.data?.length ? (
              faqs?.data?.map(faq => (
                <p key={faq?._id} className='font-medium cursor-pointer' onClick={() => handleFAQTrigger(faq)}>
                  {faq?.question}
                </p>
              ))
            ) : (
              <p className='font-medium'>No FAQ found</p>
            )}
          </div>
        )}

        <div className={cn('w-full lg:w-[calc(100%-288px)] overflow-y-auto custom-scrollbar')} ref={chatContainerRef}>
          {isListLoading ? (
            <div className='flex flex-col my-3 gap-y-5 px-5'>
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className={cn('flex', { 'justify-end': index % 2, 'justify-start': !index % 2 })}>
                  <Skeleton className='w-2/3 h-40 mb-2' />
                </div>
              ))}
            </div>
          ) : (
            tempMessages?.map(
              msg =>
                msg?.content?.[0]?.text?.value?.length > 0 && (
                  <div
                    key={msg.id}
                    className={cn('flex sm:flex-row gap-x-2 px-3 gap-y-1', {
                      'pl-14 sm:pl-16 md:pl-24 items-end sm:items-start sm:justify-end flex-col-reverse':
                        msg.role === 'user',
                      'pr-14 sm:pr-16 md:pr-24 items-start sm:justify-start flex-col': msg.role === 'assistant'
                    })}
                  >
                    {msg.role === 'assistant' && (
                      <Img
                        src={botData?.bot_logo || botImg}
                        alt='Bot'
                        className='size-10 aspect-square object-cover mt-1 rounded-full'
                      />
                    )}
                    <div className='flex flex-col'>
                      <div className='group'>
                        <div
                          className={cn(
                            'my-1 text-sm rounded-lg',
                            {
                              'ml-auto order-2 sm:order-1 p-2': msg.role === 'user',
                              'mr-auto p-2': msg.role === 'assistant'
                            },
                            msg.role === 'user' ? styles.rightMsg : styles.leftMsg
                          )}
                        >
                          {/* <MarkdownRenderer
                          className='markdown text-sm max-w-4xl'
                          codeClassName='bg-rose-200 font-semibold px-1 py-0.5 text-rose-800 rounded-sm'
                        >
                          {msg.content[0].text.value}
                        </MarkdownRenderer> */}
                          <div
                            dangerouslySetInnerHTML={{ __html: msg?.content?.[0]?.text?.value }}
                            className={cn(
                              styles.text,
                              styles.markdown,
                              'prose text-sm prose-headings:my-3 prose-p:my-1'
                            )}
                          />
                        </div>

                        {msg.role === 'assistant' && (
                          <div className='my-3 flex gap-x-2 group-hover:opacity-100 opacity-0 transition-all duration-300'>
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
                    {msg.role === 'user' && (
                      <Img
                        src={botData?.user_logo || avatarImg}
                        alt='Avatar'
                        className='size-10 aspect-square object-cover mt-1 rounded-full ml-auto sm:ml-0 order-1 sm:order-2'
                      />
                    )}
                  </div>
                )
            )
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
      />
      <PoweredBy />
      <audio ref={audioRef} />
    </main>
  )
}
