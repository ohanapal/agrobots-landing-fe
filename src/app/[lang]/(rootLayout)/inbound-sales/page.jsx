import GetStartedCTA from '@/components/pages/contact-support/GetStartedCTA'
import {
  AskAgent,
  Clients,
  CTA,
  Description1,
  Description2,
  Description3,
  Hero,
  PricingComparison,
  PricingPlans
} from '@/components/pages/homepage'
import { getBenifitsDict, getHomepageDict, getInboundSalesDict } from '@/utils/i18n/get-dictionary'

export default async function InboundSalesPage({ params: { lang } }) {
  const t = await getInboundSalesDict(lang)
  const homeT = await getHomepageDict(lang)
  const benifitsT = await getBenifitsDict(lang)
  return (
    <main>
      <AskAgent t={homeT.askAgent} />
      <Hero t={t.hero} />
      <Clients t={homeT.clients} />
      <Description1 t={t.description1} />
      <Description2 t={t.description2} />
      <Description3 t={t.description3} />
      <Description2 t={t.description4} />
      <Description3 t={t.description5} />
      <GetStartedCTA t={benifitsT.getStartedCTA} className='py-10 md:pt-20 md:pb-40' />
      <CTA t={homeT.cta} />
      <PricingPlans t={homeT.pricingPlans} />
      <PricingComparison t={homeT.pricingComparison} />
    </main>
  )
}
