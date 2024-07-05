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
  isNew?: boolean
  name: string
  photo: string
  online: boolean
  tags: string
  likes: number
  countries: UserCountriesItemI[]
  transport: UserTransportItemI[]
  level: number
}

export interface UserCardProps {
  className?: string
  item: UserCardItemI
}
