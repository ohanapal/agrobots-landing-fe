import { API_URL } from '@/configs'
import { axiosInstance } from '@/lib/axios/interceptor'
import { cn } from '@/lib/utils'
import { useGetThreadMessagesQuery } from '@/redux/features/botApi'
import styles from '@/styles/botStyles.module.scss'
import { Mic, Square } from 'lucide-react'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { runBotThread } from './bot.helpers'

const AudioRecorder = ({ id, setMessage, tempMessages, setTempMessages, setisLoading, setaudioURL }) => {
  const dispatch = useDispatch()
  const { refetch } = useGetThreadMessagesQuery(id)

  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)

  const handleStartRecording = async () => {
    setIsRecording(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      const source = audioContextRef.current.createMediaStreamSource(stream)
      analyserRef.current = audioContextRef.current.createAnalyser()
      source.connect(analyserRef.current)

      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' })
      mediaRecorderRef.current.ondataavailable = event => {
        audioChunksRef.current.push(event.data)
      }
      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        await handleSaveAudio(blob)
        audioChunksRef.current = []
      }
      mediaRecorderRef.current.start()
    } catch (err) {
      console.error(err?.message)
      toast.error('Mic not found or not permitted!')
      setIsRecording(false)
    }
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
    }
  }

  const handleSaveAudio = async blob => {
    setisLoading(true)
    if (blob) {
      const audioFile = new File([blob], 'recording.webm', { type: 'audio/webm' })
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
            cb: refetch,
            setMessage,
            setaudioURL,
            dispatch
          })
        }
      } catch (error) {
        console.error('Error uploading file', error)
      }
    }
    setisLoading(false)
  }

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
          className={cn(
            'size-12 cursor-pointer border-[3px] p-2 rounded-full',
            styles.borderPrimary,
            styles.textPrimary
          )}
          strokeWidth={2.7}
          variant='icon'
          onClick={handleStartRecording}
          disabled={isRecording}
        />
      )}
    </div>
  )
}

export default AudioRecorder
