import Typography from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { createElement } from 'react'

export default function Feature({ feature, index, featureIcons, className }) {
  return (
    <div key={feature.id} className={cn('text-balance text-center flex flex-col items-center gap-y-4', className)}>
      <div className='size-16 flex items-center justify-center bg-primary rounded-lg'>
        {featureIcons[index] && createElement(featureIcons[index], { className: 'text-white' })}
      </div>
      <Typography variant='h4' className='max-w-full sm:max-w-[75%]'>
        {feature.title}
      </Typography>
      <Typography variant='description' className='text-base'>
        {feature.description}
      </Typography>
    </div>
  )
}
