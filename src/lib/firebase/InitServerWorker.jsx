'use client'

import { useEffect } from 'react'
import { registerFirebaseMessagingSW } from './registerFirebaseMessagingSW'

export default function InitServerWorker({ children }) {
  useEffect(() => {
    registerFirebaseMessagingSW()
  }, [])
  return <>{children}</>
}
