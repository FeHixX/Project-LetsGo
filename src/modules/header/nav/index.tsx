import { FC } from 'react'

import Contact from '../contact'
import SiteList from '../site-list'
import Social from '../social'
import styles from './nav.module.scss'
import { HeaderNavProps } from './nav.types'

const Nav: FC<HeaderNavProps> = ({
  socialList,
  siteList,
  contactList,
  active
}) => (
  <nav className={active ? styles.activeroot : styles.root}>
    <SiteList siteItems={siteList} />
    <Contact contactItems={contactList} />
    <Social socialItems={socialList} />
  </nav>
)

export default Nav
