import { Button } from '@/components/ui/button'
import Comparison from './Comparison'

export default function MobileComparison({ t, index }) {
  const selectedTier = t.tiers[index]
  return (
    <section className='py-5'>
      <div className='container'>
        {index !== undefined ? (
          <div className='flex flex-col items-start border-b-0 lg:hidden border w-full gap-y-4 p-5 col-span-2 sticky left-0 top-0'>
            <div className='flex items-baseline gap-x-1'>
              <span className='text-4xl font-bold'>{selectedTier.priceMonthly}</span>
              <span className='text-sm font-semibold leading-6 text-text-tartiary'>/{t.month}</span>
            </div>
            <Button className='bg-black hover:bg-primary'>{t.choose}</Button>
          </div>
        ) : null}
        <table className='table-fixed border-collapse text-left scroll-pt-20 block lg:hidden'>
          <caption className='sr-only'>Pricing plan comparison</caption>
          <colgroup>
            {Array.from({ length: 2 }).map((_, i) => (
              <col key={i} className='w-1/4' />
            ))}
          </colgroup>

          <tbody>
            <Comparison t={t} index={index} />
          </tbody>
        </table>
      </div>
    </section>
  )
}
