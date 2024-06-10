import type { Metadata } from 'next'
import { CompanionsView } from '@/views/companions'

export const metadata: Metadata = {
  title: 'Попутчики каталог',
  description: 'Выбери попутчика из каталога'
}

export default function Companions() {
  return <CompanionsView />
}
