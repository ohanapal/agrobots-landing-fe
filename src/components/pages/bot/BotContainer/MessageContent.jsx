'use client'

import { cn } from '@/lib/utils'
import styles from '@/styles/botStyles.module.scss'
import { memo } from 'react'

const MessageContent = memo(
  function MessageContent({ msg }) {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: msg?.content?.[0]?.text?.value }}
        className={cn(
          styles.textSecondary,
          styles.markdown,
          'prose max-w-full text-sm prose-headings:my-3 prose-p:my-1 p-2 rounded-lg'
        )}
      />
    )
  },
  (prevProps, nextProps) => {
    const prevContent = prevProps.msg?.content?.[0]?.text?.value
    const nextContent = nextProps.msg?.content?.[0]?.text?.value
    return prevContent.includes('iframe') && nextContent.includes('iframe')
  }
)

export default MessageContent
