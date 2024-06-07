import { FC } from 'react'

import styles from './social.module.scss'
import { HeaderSocialProps } from './social.types'

const Social: FC<HeaderSocialProps> = ({ socialItems }) => (
  <ul className={styles.root}>
    {socialItems.map(({ href, icon, label, description }) => (
      <li className={styles.item} key={label}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={styles.link}
        >
          {icon}
          <span>{description}</span>
        </a>
      </li>
    ))}
  </ul>
)

export default Social