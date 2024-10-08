'use client'

const { app } = require('@/lib/firebase/firebaseConfig')
const { getMessaging, getToken } = require('firebase/messaging')
const { useEffect, useState } = require('react')

export const useFCMToken = () => {
  // FCM initialization
  const messaging = getMessaging(app)

  const [fcmToken, setfcmToken] = useState(undefined)

  useEffect(() => {
    const getFcmToken = async () => {
      try {
        const permission = await Notification.requestPermission()
        if (permission === 'granted' && messaging) {
          const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY
          })
          setfcmToken(token)
        }
      } catch (error) {
        console.error(error)
      }
    }

    getFcmToken()
  }, [messaging])

  return fcmToken
}
