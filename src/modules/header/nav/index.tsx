import { FC } from 'react'

import SiteList from '../site-list'
import Social from '../social'
import styles from './nav.module.scss'
import { HeaderNavProps } from './nav.types'

const Nav: FC<HeaderNavProps> = ({ socialList, siteList }) => (
  <nav className={styles.root}>
    <button className={styles.toggle}></button>
    <SiteList siteItems={siteList} />
    <Social socialItems={socialList} />
  </nav>
)

export default Nav
