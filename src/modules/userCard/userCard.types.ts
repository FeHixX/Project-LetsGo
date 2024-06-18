import { ReactNode } from 'react'

export interface userCardProps {
  className?: string
}

export interface UserCountriesItemI {
  name: string
  img: string
}

export interface UserTransportItemI {
  icon: ReactNode
  checked: boolean
}
