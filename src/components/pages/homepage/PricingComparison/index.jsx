import Comparison from './Comparison'
import MobileComparison from './MobileComparison'
import Tiers from './Tiers'

export default function PricingComparison({ t }) {
  return (
    <>
      <div className='py-20 container hidden lg:block'>
        {/* lg+ */}
        {/*FIXME: Fix the scroll padding issue here for scrolling the comparison table*/}
        <div className='border pt-20 rounded-sm overflow-hidden'>
          <table className='w-full table-fixed border-collapse text-left scroll-pt-20 top-20'>
            <caption className='sr-only'>Pricing plan comparison</caption>
            <colgroup>
              {Array.from({ length: t.tiers.length + 1 }).map((_, i) => (
                <col key={i} className='w-1/4' />
              ))}
            </colgroup>

            <tbody>
              <Tiers t={t} />
              <Comparison t={t} />
            </tbody>
          </table>
        </div>
      </div>

      {/* before lg */}
      <MobileComparison t={t} index={0} />
      <MobileComparison t={t} index={1} />
      <MobileComparison t={t} index={2} />
      <MobileComparison t={t} index={3} />
    </>
  )
}
