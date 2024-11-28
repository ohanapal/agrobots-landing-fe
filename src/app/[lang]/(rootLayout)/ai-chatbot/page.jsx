import {
  Clients,
  Description1,
  Description2,
  Description3,
  Hero,
  PricingComparison,
  PricingPlans,
  Testimonials
} from '@/components/pages/homepage'
import { getAiChatbotDict, getHomepageDict } from '@/utils/i18n/get-dictionary'

export const metadata = {
  title: 'Argobots | AI Solutions'
}

export default async function AiChatbotPage({ params: { lang } }) {
  const t = await getAiChatbotDict(lang)
  const homeT = await getHomepageDict(lang)
  return (
    <main>
      <Hero t={t.hero} />
      <Description1 t={t.description1} />
      <Description2 t={t.description2} />
      <Description3 t={t.description3} />
      <Description2 t={t.description4} />
      <Clients t={homeT.clients} />
      <PricingPlans t={homeT.pricingPlans} />
      <PricingComparison t={homeT.pricingComparison} />
      <Testimonials t={homeT.testimonials} />
    </main>
  )
}
