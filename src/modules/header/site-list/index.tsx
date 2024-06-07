import { FC } from 'react'

import styles from './site-list.module.scss'
import { HeaderSiteListProps } from './site-list.types'

const SiteList: FC<HeaderSiteListProps> = ({ siteItems }) => (
  <ul className={styles.root}>
    {siteItems.map(({ href, label, description }) => (
      <li className={styles.item} key={label}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={styles.link}
        >
          {description}
        </a>
      </li>
    ))}
  </ul>
)

export default SiteList
