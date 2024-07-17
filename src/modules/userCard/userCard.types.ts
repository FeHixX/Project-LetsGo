import { ReactNode } from 'react'

export interface UserCountriesItemI {
  name: string
  img: string
}

export interface UserTransportItemI {
  icon: ReactNode
  label?: string
  checked: boolean
}

export interface UserCardItemI {
  cardId: string; // Добавляем это свойство
  isNew?: boolean;
  name: string;
  photo: string;
  online: boolean;
  tags: string;
  likes: number;
  countries: Array<{ name: string; img: string }>;
  transport: Array<{ icon: React.ReactNode; label: string; checked: boolean }>;
  level: number;
}

export interface UserCardProps {
  className?: string;
  item: UserCardItemI;
}