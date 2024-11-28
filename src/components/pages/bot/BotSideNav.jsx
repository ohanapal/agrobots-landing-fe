'use client'

import ThemeSwitcher from '@/components/common/ThemeSwitcher'
import { Button } from '@/components/ui/button'
import { Img } from '@/components/ui/img'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useGetThreadMutation } from '@/redux/features/botApi'
import styles from '@/styles/botStyles.module.scss'
import { getDashboardUrl } from '@/utils/auth/getDashboardUrl'
import { PanelRight, PencilLine, Plus } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { runBotThread } from './bot.helpers'
import { useThreadCallback } from './bot.hooks'
import RenameThreadModal from './RenameThreadModal'

export default function BotSideNav({
  navbarOpen,
  closeNavbar,
  id,
  bot_id,
  setMessage,
  tempMessages,
  setTempMessages,
  setisLoading,
  botData,
  createNewThread,
  isCreateThreadLoading,
  thread_id,
  setthread_id,
  uid,
  userData,
  faqs,
  isFaqLoading,
  isFaqSuccess,
  allThreads,
  isAllThreadsSuccess,
  isAllThreadsLoading,
  handlePlay
}) {
  // Getting user data
  const { push } = useRouter()

  // Getting thread
  const dispatch = useDispatch()
  const { theme } = useTheme()

  const [getThread] = useGetThreadMutation()

  const selectAndSetLastSeen = useCallback(
    threadId => {
      setthread_id(threadId)
      getThread({ thread_id: threadId, updateSeen: true })
    },
    [getThread, setthread_id]
  )

  useEffect(() => {
    if (bot_id && uid) {
      if (isAllThreadsSuccess && !thread_id) {
        const thread = allThreads?.data?.at(0)
        selectAndSetLastSeen(thread?._id)
      }
    }
  }, [allThreads, bot_id, isAllThreadsSuccess, uid, selectAndSetLastSeen, thread_id])

  const [open, setopen] = useState(false)
  const [selectedThread, setselectedThread] = useState(undefined)

  const cb = useThreadCallback(id, handlePlay, botData)

  return (
    <nav
      className={cn(
        'md:min-w-80 min-w-64 w-80 md:w-64 h-svh hidden sm:flex flex-col items-center justify-between transition-all duration-500 z-50 whitespace-normal',
        {
          'min-w-0 w-0 md:min-w-0 md:w-0 overflow-hidden whitespace-nowrap': !navbarOpen
        },
        styles.bgSecondary
      )}
    >
      <div className='flex flex-col items-center justify-center w-full'>
        <div className='w-full p-3 flex items-center justify-center'>
          {botData?.logo_light ? (
            <Img
              src={theme === 'dark' && botData?.logo_dark ? botData?.logo_dark : botData?.logo_light}
              alt='logo'
              className='h-7 sm:h-12 w-auto'
            />
          ) : (
            <Skeleton className='h-7 sm:h-12 w-40' />
          )}
        </div>

        <div className='flex items-center justify-between w-full gap-x-3 px-5'>
          <div>
            {userData?.name ? (
              <p
                className={cn('text-sm font-medium cursor-pointer', styles.textPrimary)}
                onClick={() => push(getDashboardUrl(true))}
              >
                {userData?.name}
              </p>
            ) : (
              <span />
            )}
          </div>
          <div className='flex items-center justify-center gap-x-2'>
            <PanelRight
              className={cn('cursor-pointer size-6', styles.textPrimary)}
              strokeWidth={1.5}
              onClick={closeNavbar}
            />
            <ThemeSwitcher className={cn(styles.textPrimary, 'rounded-none border-none')} />
          </div>
        </div>

        <div className={cn('h-[calc(100vh-110px)] flex flex-col justify-between pb-3 w-full', styles.font)}>
          <div className='overflow-y-auto custom-scrollbar'>
            {isFaqLoading && (
              <div className='space-y-2 py-4 px-5'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className='w-full h-10' />
                ))}
              </div>
            )}
            {isFaqSuccess && (
              <div className='pb-4 pt-3 px-5'>
                <p className={cn('pb-2 tracking-widest text-sm', styles.textSecondary)}>Menu</p>
                {faqs?.data?.length ? (
                  faqs?.data?.map(faq => (
                    <p
                      key={faq?._id}
                      className={cn('cursor-pointer py-2 text-sm', styles.textPrimary)}
                      onClick={() => {
                        setMessage(faq?.question)
                        runBotThread({
                          msg: `<p>${faq?.question} <span style="display:none">Give response following this objective/answer: ${faq?.objective}</span></p>`,
                          setisLoading,
                          setTempMessages,
                          tempMessages,
                          id,
                          cb,
                          setMessage,
                          dispatch
                        })
                      }}
                    >
                      {faq?.question}
                    </p>
                  ))
                ) : (
                  <p className={cn('text-sm py-2', styles.textPrimary)}>No FAQ found</p>
                )}
              </div>
            )}

            {isAllThreadsLoading && (
              <div className='space-y-2 pb-4 px-5'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className='w-full h-10' />
                ))}
              </div>
            )}
            {isAllThreadsSuccess && (
              <div className='pb-4'>
                <p className={cn('pb-2 tracking-widest px-5 text-sm', styles.textSecondary)}>Chat History</p>
                <div className='w-full px-2'>
                  {allThreads?.data?.length ? (
                    allThreads?.data?.map(thread => (
                      <div
                        key={thread?._id}
                        className={cn('flex items-center justify-between w-full px-3 group', {
                          'rounded-lg shadow-md': thread_id === thread?._id
                        })}
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
                    <p className={cn('text-sm px-3 py-2', styles.textPrimary)}>No Chats Found</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className='px-5'>
            <Button
              variant='default'
              className={cn('w-full')}
              icon={<Plus />}
              onClick={createNewThread}
              isLoading={isCreateThreadLoading}
            >
              Create new chat
            </Button>
          </div>
        </div>
      </div>

      <RenameThreadModal open={open} setopen={setopen} thread={selectedThread} />
    </nav>
  )
}
