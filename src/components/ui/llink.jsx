'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function LLink({ children, href, ...rest }) {
  const { lang } = useParams()
  return (
    <Link href={`/${lang}${href}`} {...rest}>
      {children}
    </Link>
  )
}
