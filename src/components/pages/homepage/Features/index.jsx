import { Languages, LineChartIcon, MessagesSquare, Users } from 'lucide-react'
import Feature from './Feature'

export default function Features({ t }) {
  const featureIcons = [MessagesSquare, LineChartIcon, Users, Languages]
  return (
    <section className='container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-32 gap-x-5 gap-y-8'>
      {t.map((feature, index) => (
        <Feature key={feature.id} feature={feature} index={index} featureIcons={featureIcons} />
      ))}
    </section>
  )
}
