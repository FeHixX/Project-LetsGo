import { FC } from 'react'

import styles from './contact.module.scss'
import { HeaderContactProps } from './contact.types'

const Contact: FC<HeaderContactProps> = ({ contactItems }) => (
  <ul className={styles.root}>
    {contactItems.map(({ href, icon, label, description }) => (
      <li className={styles.item} key={label}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={styles.link}
        >
          <div className={styles.icon}>{icon}</div>
          <span>{description}</span>
        </a>
      </li>
    ))}
  </ul>
)

export default Contact
