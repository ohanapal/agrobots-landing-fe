import { Clients, Hero, PricingComparison, PricingPlans, Testimonials } from '@/components/pages/homepage'
import { getHomepageDict, getPricingDict } from '@/utils/i18n/get-dictionary'

export const metadata = {
  title: 'Pricing | Argobot'
}

export default async function PricingPage({ params: { lang } }) {
  const t = await getPricingDict(lang)
  const homeT = await getHomepageDict(lang)
  return (
    <main>
      <Hero t={t.hero} />
      <Clients t={homeT.clients} />
      <PricingPlans t={homeT.pricingPlans} />
      <PricingComparison t={homeT.pricingComparison} />
      <Testimonials t={homeT.testimonials} />
    </main>
  )
}
