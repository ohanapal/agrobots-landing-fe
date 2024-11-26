'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import Typography from '@/components/ui/typography'
import { useGetAllSubscriptionsQuery } from '@/redux/features/companiesApi'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import PricingCard from '../../homepage/pricingPlans/PricingCard'

export default function PricingPlans() {
  const params = useSearchParams()
  const hasPackageId = params.has('package_id')
  const packageId = hasPackageId && params.get('package_id')
  const { isLoading, isSuccess, data } = useGetAllSubscriptionsQuery({
    page: 1,
    limit: 100,
    sortBy: 'createdAt',
    sortOrder: 'asc'
  })
  const frequencies = [
    { value: 'monthly', priceSuffix: '/month' },
    { value: 'yearly', priceSuffix: '/year' }
  ]

  const [frequency, setFrequency] = useState(frequencies[0])

  const selectedPackage = data?.data?.find(tier => tier._id === packageId)

  const filteredPackages = data?.data?.filter(tier => !tier.hidden)

  return (
    <div className='pt-20 pb-10 container'>
      <div className='flex items-center justify-center'>
        <Typography variant='description' className='text-sm sm:text-xl'>
          Billed Monthly
        </Typography>
        <Switch
          className='mx-2'
          size='lg'
          onCheckedChange={e => (e ? setFrequency(frequencies[1]) : setFrequency(frequencies[0]))}
        />
        <Typography variant='description' className='text-text text-sm sm:text-xl'>
          Billed Anually
        </Typography>
      </div>

      <div className='isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4'>
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className='rounded-lg w-full h-96' />)
          : null}
        {isSuccess ? (
          hasPackageId && selectedPackage ? (
            <PricingCard tier={selectedPackage} frequency={frequency} />
          ) : (
            filteredPackages?.map(tier => <PricingCard key={tier.id} tier={tier} frequency={frequency} />)
          )
        ) : null}
      </div>
    </div>
  )
}
