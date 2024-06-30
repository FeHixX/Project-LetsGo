import type { Metadata } from 'next'
import { DirectionsView } from '@/views/directions'

export const metadata: Metadata = {
  title: 'Попутчики форма',
  description: 'Найди попутчика заполнив форму'
}

export default function Directions() {
  return <DirectionsView />
}
