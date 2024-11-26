import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import usePush from '@/hooks/usePush'
import { useSubscribeToPackageMutation } from '@/redux/features/companiesApi'
import { useGetUserQuery } from '@/redux/features/usersApi'
import { getUserId } from '@/utils/auth/getUserId'
import { rtkErrorMesage } from '@/utils/error/errorMessage'
import { CheckIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

function transformFeatures(features) {
  return features.reduce((acc, feature) => {
    if (feature.type === 'String') {
      acc.push(`${feature.name}: ${feature.value}`)
    } else if (feature.type === 'Boolean' && feature.value) {
      acc.push(feature.name)
    }
    return acc
  }, [])
}

export default function PricingCard({ tier, frequency, redirectToSignup }) {
  const push = usePush()
  const features = transformFeatures(tier?.features)

  const [subscribe, { isLoading, isSuccess, isError, error, data }] = useSubscribeToPackageMutation()

  const { data: userData } = useGetUserQuery(getUserId())

  const subscribeFn = () => {
    const packageData = tier.price[frequency.value]
    if (redirectToSignup) push('/signup')
    else
      subscribe({
        price_id: packageData.stripe_id,
        package_id: tier._id,
        recurring_type: frequency.value,
        company_id: userData?.user?.company_id
      })
  }

  useEffect(() => {
    if (isSuccess) {
      if (data?.stripeSession) redirect(data?.stripeSession)
      else push('/payment/success')
    }
    if (isError) toast.error(rtkErrorMesage(error))
  }, [isSuccess, isError, error, data, push])

  return (
    <div key={tier?.id} className='rounded-lg p-8 text-center bg-primary-foreground'>
      <Typography variant='h4' id={tier?.id}>
        {tier?.name}
      </Typography>
      <p className='mt-4 text-sm leading-6 text-text-tartiary'>{tier?.description}</p>
      <div className='flex items-center justify-center'>
        <p className='mt-6 flex items-baseline gap-x-1'>
          <span className='mb-auto text-xl font-bold -translate-y-2 text-text'>$</span>
          <span className='text-5xl font-bold tracking-tight text-text'>{tier?.price[frequency.value].price}</span>
          <span className='text-sm font-semibold leading-6 text-text-secondary'>{frequency.priceSuffix}</span>
        </p>
      </div>
      <Button className='w-full mt-5' onClick={subscribeFn} isLoading={isLoading}>
        Get Started Now
      </Button>
      <ul role='list' className='mt-8 space-y-3 text-sm leading-6 text-text-secondary'>
        {features.map(feature => (
          <li key={feature} className='flex items-start gap-x-3 text-xs text-left'>
            <div className='bg-primary p-0.5 rounded-full'>
              <CheckIcon className='size-3 flex-none text-white' aria-hidden='true' />
            </div>
            <p>{feature}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
