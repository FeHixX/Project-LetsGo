import { HeaderSiteItemI, HeaderSocialItemI, HeaderContactItemI } from '../header.types'

export interface HeaderNavProps {
  socialList: HeaderSocialItemI[]
  siteList: HeaderSiteItemI[]
  contactList: HeaderContactItemI[]
  active: boolean
}
