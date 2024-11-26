'use client'

import Typography from '@/components/ui/typography'
import usePush from '@/hooks/usePush'
import { logoutActions } from '@/utils/auth/logoutActions'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function Logout() {
  const push = usePush()
  const dispatch = useDispatch()
  const { refresh } = useRouter()

  useEffect(() => {
    logoutActions(dispatch, refresh, () => {
      push('/')
    })
  }, [dispatch, push, refresh])
  return (
    <div className='flex items-center justify-center min-h-screen gap-x-3'>
      <Typography variant='h3' className='font-light'>
        Please wait
      </Typography>
      <Loader className='animate-spin text-text-heading size-10' />
    </div>
  )
}
