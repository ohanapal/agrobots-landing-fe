import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import Typography from '@/components/ui/typography'
import { Home, Undo, X } from 'lucide-react'
import BackButton from './BackButton'

export const metadata = {
  title: 'Payment Fail | Argobots'
}

export default function PaymentFailPage() {
  return (
    <div className='bg-primary-foreground h-screen flex items-center justify-center px-5'>
      <div className='bg-background py-5 sm:py-6 px-5 sm:px-8 rounded-xl shadow-lg flex flex-col items-center justify-center'>
        <div className='bg-red-600 rounded-full p-2'>
          <X size={80} className='text-white' />
        </div>

        <div className='text-center text-balance space-y-3 mt-6'>
          <Typography variant='h3' className='text-center'>
            Payment Failed!
          </Typography>
          <p className='text-text-secondary font-medium my-2'>Your payment has been failed due to some reason</p>
          <p className='text-text-tartiary font-medium text-lg'>Try again by going back or start from the scratch</p>
          <div className='py-5 text-center flex flex-wrap items-center justify-center gap-x-6 gap-y-3'>
            <BackButton>
              <Button variant='success' icon={<Undo />}>
                Go Back
              </Button>
            </BackButton>
            <LLink href='/'>
              <Button icon={<Home />}>Go back Home</Button>
            </LLink>
          </div>
        </div>
      </div>
    </div>
  )
}
