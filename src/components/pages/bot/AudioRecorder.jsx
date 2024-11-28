import { API_URL } from '@/configs'
import { axiosInstance } from '@/lib/axios/interceptor'
import { cn } from '@/lib/utils'
import styles from '@/styles/botStyles.module.scss'
import { Mic, Square } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { runBotThread } from './bot.helpers'
import { useThreadCallback } from './bot.hooks'

const AudioRecorder = ({
  id,
  setMessage,
  tempMessages,
  setTempMessages,
  setisLoading,
  setaudioURL,
  handlePlay,
  botData
}) => {
  const dispatch = useDispatch()
  const [isIOS, setIsIOS] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const streamRef = useRef(null)

  const cb = useThreadCallback(id, handlePlay, botData)

  useEffect(() => {
    // Detect iOS device
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    setIsIOS(iOS)
  }, [])

  const initializeRecorder = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          // iOS-specific constraints
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      })

      streamRef.current = stream

      // For iOS, we need to use different MIME types
      const mimeType = isIOS ? 'audio/mp4' : 'audio/webm'
      const options = {
        mimeType: MediaRecorder.isTypeSupported(mimeType) ? mimeType : 'audio/webm',
        audioBitsPerSecond: 128000
      }

      mediaRecorderRef.current = new MediaRecorder(stream, options)

      mediaRecorderRef.current.ondataavailable = event => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, {
          type: isIOS ? 'audio/mp4' : 'audio/webm'
        })
        await handleSaveAudio(blob)
        audioChunksRef.current = []

        // Clean up stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop())
        }
      }

      return true
    } catch (err) {
      console.error('Media Device Error:', err)
      toast.error(getErrorMessage(err))
      return false
    }
  }

  const getErrorMessage = error => {
    if (error.name === 'NotAllowedError') {
      return 'Microphone access denied. Please enable microphone permissions.'
    } else if (error.name === 'NotFoundError') {
      return 'No microphone found. Please connect a microphone and try again.'
    } else if (error.name === 'NotReadableError') {
      return 'Microphone is already in use by another application.'
    } else {
      return 'Failed to access microphone. Please try again.'
    }
  }

  const handleStartRecording = async () => {
    // Request permission first on iOS
    if (isIOS) {
      const permissionResult = await navigator.permissions.query({ name: 'microphone' })
      if (permissionResult.state === 'denied') {
        toast.error('Microphone access denied. Please enable microphone permissions.')
        return
      }
    }

    const initialized = await initializeRecorder()
    if (!initialized) return

    setIsRecording(true)

    try {
      // Start recording with a shorter time slice for more frequent ondataavailable events
      mediaRecorderRef.current.start(isIOS ? 1000 : 100)
    } catch (err) {
      console.error('Recording Start Error:', err)
      setIsRecording(false)
      toast.error('Failed to start recording. Please try again.')
    }
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
  }

  const handleSaveAudio = async blob => {
    setisLoading(true)

    if (blob && blob.size > 0) {
      // Use .mp4 extension for iOS, .webm for others
      const fileName = `recording.${isIOS ? 'mp4' : 'webm'}`
      const audioFile = new File([blob], fileName, {
        type: isIOS ? 'audio/mp4' : 'audio/webm'
      })

      const formData = new FormData()
      formData.append('file', audioFile)

      try {
        const response = await axiosInstance.post(`${API_URL}/audios/transcript`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        if (response?.status === 200) {
          const speechToText = response?.data?.transcript?.text
          setMessage(speechToText)
          runBotThread({
            msg: speechToText,
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
      } catch (error) {
        console.error('Transcription Error:', error)
        toast.error('Failed to process audio. Please try again.')
      }
    } else {
      toast.error('No audio recorded. Please try again.')
    }

    setisLoading(false)
  }

  // Cleanup function
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  return (
    <div className='flex items-center gap-x-3'>
      {isRecording ? (
        <div onClick={handleStopRecording} className='relative cursor-pointer'>
          <Square
            className='size-10 cursor-pointer border-[3px] p-2 rounded-full animate-pulse text-red-500 border-red-500'
            strokeWidth={2.7}
            variant='icon'
            disabled={!isRecording}
          />
          <div className='absolute top-0 left-0 w-full h-full rounded-full animate-ping border-2 border-red-500 p-2 z-20' />
        </div>
      ) : (
        <Mic
          className={cn('size-6 cursor-pointer', styles.textSecondary)}
          variant='icon'
          onClick={handleStartRecording}
          disabled={isRecording}
        />
      )}
    </div>
  )
}

export default AudioRecorder
