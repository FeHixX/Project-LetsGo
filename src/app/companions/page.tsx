import type { Metadata } from 'next'
import { CompanionsView } from '@/views/companions'

export const metadata: Metadata = {
  title: 'Попутчики',
  description: 'Каталог попутчиков с фильтрацией'
}

export default function Companions() {
  return <CompanionsView />
}
