export const dynamic = 'force-dynamic'

import {
  AskAgent,
  CTA,
  CTA2,
  Clients,
  Description1,
  Description2,
  Description3,
  Features,
  Hero,
  PricingPlans,
  Testimonials
} from '@/components/pages/homepage'
import RedirectToDashboard from '@/components/pages/homepage/RedirectToDashboard'
import { getHomepageDict } from '@/utils/i18n/get-dictionary'

export const metadata = {
  title: 'Argobot | AI Solutions'
}

export default async function Home({ params: { lang } }) {
  const t = await getHomepageDict(lang)
  return (
    <main>
      <RedirectToDashboard />
      <AskAgent t={t.askAgent} />
      <Hero t={t.hero} />
      <Clients t={t.clients} />
      {/* <Marquee /> */}
      <Features t={t.features} />
      <CTA t={t.cta} />
      <Description1 t={t.description1} />
      <Description2 t={t.description2} />
      <Description3 t={t.description3} />
      <CTA2 t={t.cta2} />
      <PricingPlans t={t.pricingPlans} />
      {/* <PricingComparison t={t.pricingComparison} /> */}
      <Testimonials t={t.testimonials} />
    </main>
  )
}
