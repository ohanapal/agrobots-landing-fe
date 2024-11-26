/* eslint-disable no-unused-vars */
'use client'

import { API_URL, IP_INFO_API_URL } from '@/configs'
import { axiosInstance } from '@/lib/axios/interceptor'
import {
  useCreateThreadMutation,
  useGetAllThreadQuery,
  useGetBotFAQQuery,
  useGetBotUsingSlugQuery
} from '@/redux/features/botApi'
import { rtkErrorMesage } from '@/utils/error/errorMessage'
import uuid from '@/utils/form/uuid'
import axios from 'axios'
import { getCookie, setCookie } from 'cookies-next'
import { SkipForward } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useParams, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import ReactPlayer from 'react-player'
import { useDispatch } from 'react-redux'
import BotContainer from './BotContainer'
import BotHistory from './BotHistory'
import BotMobileFAQs from './BotMobileFAQs'
import BotSideNav from './BotSideNav'
import { runBotThread } from './bot.helpers'
import { useThreadCallback } from './bot.hooks'

const documentRefferer = referrerSrc => {
  const referrer = typeof referrerSrc === 'string' ? referrerSrc.toLowerCase() : referrerSrc
  if (referrer.includes('facebook')) return 'facebook'
  else if (referrer.includes('linkedin')) return 'linkedin'
  else if (referrer.includes('whatsapp')) return 'whatsapp'
  else if (referrer.includes('instagram')) return 'instagram'
  else if (referrer.includes('bldr')) return 'web'
  else return undefined
}

export default function BotPageComponent({ videoUrl }) {
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
  // Audio playing
  const audioRef = useRef()
  const [audioState, setAudioState] = useState({}) // Store audio URLs and their loading state
  const [currentPlayingId, setCurrentPlayingId] = useState(null) // Track currently playing audio

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
        setCurrentPlayingId(null) // Reset the current playing ID
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
  }, []) // Ensure this effect runs only once

  const prepareAudio = useCallback(
    async (message, msgId) => {
      if (audioState[msgId]?.url) {
        // If audio is already prepared, just play it
        setCurrentPlayingId(msgId)
        audioRef.current.src = audioState[msgId].url // Set the audio source
        playAudio()
        return
      }

      setAudioState(prev => ({ ...prev, [msgId]: { isLoading: true } }))

      try {
        const res = await axiosInstance.post(
          `${API_URL}/audios/text-to-speech`,
          { message: convertHtmlToPlainText(message) },
          { responseType: 'blob' }
        )

        const url = URL.createObjectURL(res.data)
        setAudioState(prev => ({ ...prev, [msgId]: { url, isLoading: false } }))
        setCurrentPlayingId(msgId)

        audioRef.current.src = url // Set the audio source after fetching
        playAudio()
      } catch (error) {
        setAudioState(prev => ({ ...prev, [msgId]: { isLoading: false } }))
        console.error(error)
      }
    },
    [audioState]
  )

  const handlePlay = useCallback(
    msg => {
      if (currentPlayingId === msg.id) {
        stopAudio()
      } else {
        prepareAudio(msg.content[0].text.value, msg.id)
      }
    },
    [currentPlayingId, prepareAudio]
  )

  // End of audio playing

  const [videoPlayEnded, setVideoPlayEnded] = useState(false)
  const params = useSearchParams()
  const hasReferrer = params.get('referrer')
  const [referrer, setReferrer] = useState(undefined)

  useEffect(() => {
    setReferrer(documentRefferer(document.referrer) || hasReferrer)
  }, [hasReferrer])

  const [bot_id, setbot_id] = useState(undefined)
  const [thread_id, setthread_id] = useState(undefined)
  const [uid, setuid] = useState(undefined)

  const [
    createThread,
    { isSuccess: isThreadSuccess, isError, error, data: threadData, isLoading: isCreateThreadLoading }
  ] = useCreateThreadMutation()

  const createNewThreadFn = useCallback(
    async isNewInstance => {
      const ipData = await axios.get(IP_INFO_API_URL)
      const { city, country, latitude, longitude } = { ...ipData.data }
      const location = {
        address: city && country ? `${city}, ${country}` : city || country || 'Unknown',
        lat: latitude,
        long: longitude
      }

      if (isNewInstance) {
        const newUid = uuid()
        setCookie('uid', newUid)
        setuid(newUid)
        createThread({
          bot_id,
          thread_id: 'new',
          name: 'Untitled Thread',
          unique_id: newUid,
          location,
          source: referrer
        })
      } else {
        createThread({ bot_id, thread_id: 'new', name: 'Untitled Thread', unique_id: uid, location, source: referrer })
      }
    },
    [bot_id, createThread, uid, referrer]
  )

  useEffect(() => {
    if (bot_id) {
      const localUid = getCookie('uid')
      if (localUid) setuid(localUid)
      else createNewThreadFn(true)
    }
  }, [bot_id, createThread, createNewThreadFn])

  const { slug } = useParams()
  const { data, isSuccess } = useGetBotUsingSlugQuery(slug)

  // Setting the bot variables only for bot page
  const { theme } = useTheme()
  useEffect(() => {
    if (isSuccess) {
      setbot_id(data?.data?._id)

      const colorPalette = data?.data?.color_palette

      document.documentElement.style.setProperty('--gradient-color-1', colorPalette?.gradient?.[0])
      document.documentElement.style.setProperty('--gradient-color-2', colorPalette?.gradient?.[1])

      if (theme === 'light') {
        document.documentElement.style.setProperty('--bot-primary-color', colorPalette?.primary_color)
        document.documentElement.style.setProperty('--bot-secondary-color', colorPalette?.secondary_color)
        document.documentElement.style.setProperty('--bot-primary-font-color', colorPalette?.primary_font_color)
        document.documentElement.style.setProperty('--bot-secondary-font-color', colorPalette?.secondary_font_color)
      } else if (theme === 'dark') {
        document.documentElement.style.setProperty('--bot-primary-color', colorPalette?.primary_color_dark)
        document.documentElement.style.setProperty('--bot-secondary-color', colorPalette?.secondary_color_dark)
        document.documentElement.style.setProperty('--bot-primary-font-color', colorPalette?.primary_font_color_dark)
        document.documentElement.style.setProperty(
          '--bot-secondary-font-color',
          colorPalette?.secondary_font_color_dark
        )
      }
    }
  }, [isSuccess, data, theme])

  const [navbarOpen, setnavbarOpen] = useState(true)

  // Bot States
  const [message, setMessage] = useState('')
  const [isLoading, setisLoading] = useState('')
  const [tempMessages, setTempMessages] = useState([])
  const [current_run, setcurrent_run] = useState(undefined)

  useEffect(() => {
    if (isThreadSuccess && bot_id) {
      const newThreadId = threadData?.thread?._id
      setthread_id(newThreadId)
    }

    if (isError) toast.error(rtkErrorMesage(error))
  }, [isThreadSuccess, isError, error, threadData, bot_id])

  const closeNavbar = () => {
    setnavbarOpen(false)
    setCookie('navbarOpen', false)
  }

  const openNavbar = () => {
    setnavbarOpen(true)
    setCookie('navbarOpen', true)
  }

  useEffect(() => {
    const isNavbarOpen = getCookie('navbarOpen')
    if (isNavbarOpen === 'true' || navbarOpen) setnavbarOpen(true)
    else setnavbarOpen(false)
  }, [navbarOpen])

  const [userData, setUserData] = useState(null)
  useEffect(() => {
    const user = getCookie('userData')
    const userDataParsed = user && JSON.parse(user)
    if (userDataParsed) setUserData(userDataParsed)
  }, [])

  // States for mobile screens
  const [historyOpen, setHistoryOpen] = useState(false)
  const { data: faqs, isLoading: isFaqLoading, isSuccess: isFaqSuccess } = useGetBotFAQQuery(bot_id)

  const [faqsOpen, setFaqsOpen] = useState(false)
  // Fetching all the threads for that unique id
  const {
    data: allThreads,
    isSuccess: isAllThreadsSuccess,
    isLoading: isAllThreadsLoading
  } = useGetAllThreadQuery({ unique_id: uid, limit: 100, sortBy: 'createdAt', sortOrder: 'desc' }, { skip: !uid })
  // Function for custom function calling by button
  const dispatch = useDispatch()

  const cb = useThreadCallback(thread_id, tempMessages, handlePlay, data?.data)

  const handleCallback = useCallback(
    message => {
      runBotThread({
        msg: message,
        setisLoading,
        setTempMessages,
        tempMessages,
        id: thread_id,
        cb,
        setMessage,
        setaudioURL: null,
        dispatch
      })
    },
    [dispatch, tempMessages, thread_id, cb]
  )
  useEffect(() => {
    window.handleCallback = handleCallback
    window.thread_id = thread_id
  }, [handleCallback, thread_id])

  if (videoUrl && !videoPlayEnded) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
        <ReactPlayer
          url={videoUrl}
          width='100%'
          height='100%'
          playing
          muted
          onEnded={() => setVideoPlayEnded(true)}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '100%',
            minHeight: '100%',
            zIndex: 1 // Added z-index to ensure visibility
          }}
        />
        <div
          className='bg-black/30 dark:bg-white/30 px-3 py-2 flex items-center gap-x-2 fixed bottom-10 right-10 font-medium rounded-sm cursor-pointer z-10'
          onClick={() => setVideoPlayEnded(true)}
        >
          Skip <SkipForward className='size-5' />
        </div>
      </div>
    )
  }

  return (
    <div className='flex'>
      <BotSideNav
        uid={uid}
        bot_id={bot_id}
        id={thread_id}
        botData={data?.data}
        navbarOpen={navbarOpen}
        closeNavbar={closeNavbar}
        setMessage={setMessage}
        tempMessages={tempMessages}
        setTempMessages={setTempMessages}
        isLoading={isLoading}
        setisLoading={setisLoading}
        isCreateThreadLoading={isCreateThreadLoading}
        createNewThread={() => createNewThreadFn(false)}
        setthread_id={setthread_id}
        thread_id={thread_id}
        userData={userData}
        faqs={faqs}
        isFaqLoading={isFaqLoading}
        isFaqSuccess={isFaqSuccess}
        allThreads={allThreads}
        isAllThreadsSuccess={isAllThreadsSuccess}
        isAllThreadsLoading={isAllThreadsLoading}
        handlePlay={handlePlay}
      />
      <BotContainer
        id={thread_id}
        botData={data?.data}
        navbarOpen={navbarOpen}
        openNavbar={openNavbar}
        message={message}
        setMessage={setMessage}
        tempMessages={tempMessages}
        setTempMessages={setTempMessages}
        isLoading={isLoading}
        setisLoading={setisLoading}
        current_run={current_run}
        setcurrent_run={setcurrent_run}
        userData={userData}
        setHistoryOpen={setHistoryOpen}
        setFaqsOpen={setFaqsOpen}
        handlePlay={handlePlay}
        currentPlayingId={currentPlayingId}
        stopAudio={stopAudio}
        audioState={audioState}
      />
      <BotHistory
        historyOpen={historyOpen}
        setHistoryOpen={setHistoryOpen}
        allThreads={allThreads}
        isAllThreadsSuccess={isAllThreadsSuccess}
        isAllThreadsLoading={isAllThreadsLoading}
        thread_id={thread_id}
        setthread_id={setthread_id}
        createNewThread={() => createNewThreadFn(false)}
        isCreateThreadLoading={isCreateThreadLoading}
      />
      <BotMobileFAQs
        uid={uid}
        bot_id={bot_id}
        id={thread_id}
        botData={data?.data}
        navbarOpen={navbarOpen}
        closeNavbar={closeNavbar}
        setMessage={setMessage}
        tempMessages={tempMessages}
        setTempMessages={setTempMessages}
        isLoading={isLoading}
        setisLoading={setisLoading}
        isCreateThreadLoading={isCreateThreadLoading}
        createNewThread={() => createNewThreadFn(false)}
        setthread_id={setthread_id}
        userData={userData}
        faqs={faqs}
        isFaqLoading={isFaqLoading}
        isFaqSuccess={isFaqSuccess}
        faqsOpen={faqsOpen}
        setFaqsOpen={setFaqsOpen}
        handlePlay={handlePlay}
      />
      <audio ref={audioRef} />
    </div>
  )
}
