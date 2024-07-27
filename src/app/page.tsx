import type { Metadata } from 'next'
import { DirectionsView } from '@/views/directions'

export const metadata: Metadata = {
  title: 'Направления',
  description: 'Заполните форму'
}

export default function Directions() {
  return <DirectionsView />
}
