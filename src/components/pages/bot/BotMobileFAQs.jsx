import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import styles from '@/styles/botStyles.module.scss'
import { ChevronLeft } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { runBotThread } from './bot.helpers'
import { useThreadCallback } from './bot.hooks'

export default function BotMobileFAQs({
  faqsOpen,
  setFaqsOpen,
  setMessage,
  setTempMessages,
  tempMessages,
  id,
  isFaqLoading,
  isFaqSuccess,
  faqs,
  setisLoading,
  handlePlay,
  botData
}) {
  const dispatch = useDispatch()
  const cb = useThreadCallback(id, tempMessages, handlePlay, botData)
  return (
    <section
      className={cn(
        styles.bgPrimary,
        'w-full fixed top-0 left-0 z-50 min-h-screen py-5 transition-all duration-500 h-screen',
        {
          'left-[-100%]': !faqsOpen
        }
      )}
    >
      <div className='flex items-center gap-x-3 justify-between px-5'>
        <p className={cn(styles.textPrimary, 'text-lg font-semibold')}>FAQs</p>
        <Button variant='outline' size='icon' onClick={() => setFaqsOpen(false)}>
          <ChevronLeft className='size-5' />
        </Button>
      </div>

      <div className='overflow-y-auto custom-scrollbar h-[calc(100vh-60px)]'>
        {isFaqLoading && (
          <div className='space-y-2 py-4 px-5'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className='w-full h-10' />
            ))}
          </div>
        )}
        {isFaqSuccess && (
          <div className='pb-4 pt-5 px-5'>
            {faqs?.data?.length ? (
              <div className='space-y-4'>
                {faqs?.data?.map(faq => (
                  <p
                    key={faq?._id}
                    className={cn(
                      'cursor-pointer py-4 text-sm rounded-lg px-5',
                      styles.textPrimary,
                      styles.bgSecondary
                    )}
                    onClick={() => {
                      setMessage(faq?.question)
                      runBotThread({
                        msg: `<p>${faq?.question} <span style="display:none">Give response following this: ${faq?.objective}</span></p>`,
                        setisLoading,
                        setTempMessages,
                        tempMessages,
                        id,
                        cb,
                        setMessage,
                        dispatch
                      })
                      setFaqsOpen(false)
                    }}
                  >
                    {faq?.question}
                  </p>
                ))}
              </div>
            ) : (
              <p className={cn('cursor-pointer py-2 text-sm', styles.textPrimary)}>No FAQ found</p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
