'use client'

import { useRouter } from 'next/navigation'

export default function BackButton({ children, className }) {
  const { back } = useRouter()
  return (
    <span className={className} onClick={back}>
      {children}
    </span>
  )
}
