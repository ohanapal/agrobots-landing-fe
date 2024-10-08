import { PlaceholderAnimation } from '@/components/ui/placeholder-animation'

export default function AskAgent({ t }) {
  return (
    <PlaceholderAnimation
      title={t.title}
      placeholders={t.placeholders}
      className='fixed top-[90vh] left-1/2 -translate-x-1/2 px-4 z-50'
    />
  )
}
