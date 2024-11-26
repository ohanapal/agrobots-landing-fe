import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useGetThreadMutation } from '@/redux/features/botApi'
import styles from '@/styles/botStyles.module.scss'
import { ChevronLeft, PencilLine, Plus } from 'lucide-react'
import { useCallback, useState } from 'react'
import RenameThreadModal from './RenameThreadModal'

export default function BotHistory({
  historyOpen,
  setHistoryOpen,
  allThreads,
  isAllThreadsSuccess,
  isAllThreadsLoading,
  thread_id,
  setthread_id,
  createNewThread,
  isCreateThreadLoading
}) {
  const [open, setopen] = useState(false)
  const [selectedThread, setselectedThread] = useState(undefined)

  const [getThread] = useGetThreadMutation()

  const selectAndSetLastSeen = useCallback(
    threadId => {
      setthread_id(threadId)
      getThread({ thread_id: threadId, updateSeen: true })
      setHistoryOpen(false)
    },
    [getThread, setHistoryOpen, setthread_id]
  )

  return (
    <>
      <section
        className={cn(
          styles.bgPrimary,
          'w-full fixed top-0 right-0 z-50 min-h-screen p-5 transition-all duration-500',
          {
            'right-[-100%]': !historyOpen
          }
        )}
      >
        <div className='flex items-center gap-x-3 justify-between'>
          <p className={cn(styles.textPrimary, 'text-lg font-semibold')}>History</p>
          <Button variant='outline' size='icon' onClick={() => setHistoryOpen(false)}>
            <ChevronLeft className='size-5' />
          </Button>
        </div>

        {isAllThreadsLoading && (
          <div className='space-y-2 pb-4'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className='w-full h-10' />
            ))}
          </div>
        )}
        {isAllThreadsSuccess && (
          <div className='pb-4'>
            <div className='w-full mt-5 space-y-4 h-[calc(100vh-140px)] overflow-y-auto'>
              {allThreads?.data?.length ? (
                allThreads?.data?.map(thread => (
                  <div
                    key={thread?._id}
                    className={cn(
                      'flex items-center justify-between w-full px-3 py-2 group rounded-lg shadow-sm',
                      {
                        'rounded-lg shadow-md': thread_id === thread?._id
                      },
                      styles.bgSecondary
                    )}
                  >
                    <p
                      className={cn(
                        'cursor-pointer py-2 max-w-full w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm',
                        styles.textPrimary
                      )}
                      onClick={() => selectAndSetLastSeen(thread?._id)}
                    >
                      {thread?.name || 'Untitled Chat'}
                    </p>

                    <PencilLine
                      className={cn(
                        'group-hover:opacity-50 opacity-0 size-5 transition-opacity cursor-pointer ml-2',
                        styles.textPrimary
                      )}
                      onClick={e => {
                        e.stopPropagation()
                        setopen(true)
                        setselectedThread(thread)
                      }}
                    />
                  </div>
                ))
              ) : (
                <p className='text-sm'>No Threads Found</p>
              )}
            </div>
            <div
              className={cn('px-5 fixed bottom-5 w-full left-1/2 -translate-x-1/2 transition-all duration-500', {
                'opacity-0 pointer-events-none -z-50': !historyOpen
              })}
            >
              <Button
                variant='default'
                className={cn('w-full')}
                icon={<Plus />}
                onClick={() => {
                  createNewThread()
                  setHistoryOpen(false)
                }}
                isLoading={isCreateThreadLoading}
              >
                Create new chat
              </Button>
            </div>
          </div>
        )}
      </section>
      <RenameThreadModal open={open} setopen={setopen} thread={selectedThread} />
    </>
  )
}
