export const dynamic = 'force-dynamic'

import BotPageComponent from '@/components/pages/bot'
import { API_URL } from '@/configs'

export const metadata = {
  title: 'BotPage | Argobots'
}

export default async function BotPage({ params }) {
  const res = await fetch(`${API_URL}/bots/get-by-url/${params.slug}`, { cache: 'no-store' })
  const bot = await res.json()
  return <BotPageComponent videoUrl={bot?.data?.cover_video_url} />
}
