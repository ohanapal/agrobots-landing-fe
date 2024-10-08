import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useGetThreadMessagesQuery } from '@/redux/features/botApi'
import styles from '@/styles/botStyles.module.scss'
import { Plus } from 'lucide-react'
import { useDispatch } from 'react-redux'
import AudioRecorder from '../AudioRecorder'
import { runBotThread } from '../bot.helpers'
import FileUploader from '../FileUploader'
import SendIcon from './SendIcon'

export default function BotForm({
  id,
  message,
  setMessage,
  tempMessages,
  setTempMessages,
  isLoading,
  setisLoading,
  setaudioURL
}) {
  const dispatch = useDispatch()
  const { refetch } = useGetThreadMessagesQuery(id)
  const handleSubmit = e => {
    e.preventDefault()
    if (message === '') return

    runBotThread({
      msg: message,
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
  return (
    <div className='fixed bottom-12 left-1/2 -translate-x-1/2 max-w-5xl w-full px-5 flex items-center gap-x-3'>
      <form
        onSubmit={handleSubmit}
        className='flex items-center justify-between rounded-xl gap-x-3 w-full bg-background shadow-md'
      >
        <Textarea
          type='text'
          containerClassName='w-full max-w-full min-h-14'
          className='w-full max-w-full min-h-14 border-none focus-visible:ring-0 resize-none'
          placeholder='Ask anything...'
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={1}
          onKeyDown={e => (e.key === 'Enter' && !e.shiftKey ? handleSubmit(e) : null)}
        />
        <button type='submit'>
          <SendIcon />
        </button>
      </form>
      <div className='hidden md:flex items-center gap-x-2'>
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
        <FileUploader id={id} />
      </div>

      <DropdownMenu>
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
      </DropdownMenu>
    </div>
  )
}
