import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'

const Tier = ({ tier, t }) => {
  return (
    <td key={tier.id} className='px-6 py-5 xl:px-8 border border-t-0 space-y-6'>
      <div className='flex items-baseline gap-x-1'>
        <span className='text-4xl font-bold'>{tier.priceMonthly}</span>
        <span className='text-sm font-semibold leading-6 text-text-tartiary'>/{t.month}</span>
      </div>
      <Button className='w-full bg-black hover:bg-primary'>{t.choose}</Button>
    </td>
  )
}

export default function Tiers({ t, index }) {
  const selectedTier = t.tiers[index]
  return (
    <tr className='sticky top-0 left-0'>
      <th scope='row' className='p-3 space-y-3'>
        <div className='flex flex-wrap items-center gap-x-4'>
          <Typography variant='h6'>{t.comparePlans}</Typography>
          <button className='px-3 py-1 rounded-full text-text border border-text font-normal'>{t.off}</button>
        </div>
        <p className='text-text-tartiary text-sm font-normal'>{t.description}</p>
      </th>
      {index !== undefined ? (
        <Tier tier={selectedTier} t={t} />
      ) : (
        t.tiers.map(tier => <Tier key={tier.id} tier={tier} t={t} />)
      )}
    </tr>
  )
}
