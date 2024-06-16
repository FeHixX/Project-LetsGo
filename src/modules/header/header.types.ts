import { ReactNode } from 'react'

export interface HeaderSiteItemI {
  href: string
  label: string
  description: string
}
export interface HeaderContactItemI {
  icon: ReactNode
  href: string
  label: string
  description: string
}
export interface HeaderSocialItemI {
  icon: ReactNode
  label: string
  href: string
}