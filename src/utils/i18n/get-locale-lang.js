'use client'

/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from 'next/navigation'

export const getLocaleLang = () => {
  const { lang } = useParams()
  return lang
}
