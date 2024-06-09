import type { Metadata } from 'next'
import { HomeView } from '@views/home'

export const metadata: Metadata = {
  title: 'Поехали?',
  description: 'В путешествие с крутыми попутчиками!'
}

export default function Home() {
  return <HomeView />
}
