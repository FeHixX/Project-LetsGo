import { FC } from 'react'
import classNames from 'classnames'

import styles from './social.module.scss'
import { FooterSocialProps } from './social.types'

const Social: FC<FooterSocialProps> = ({ items, className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <ul className={rootClassName}>
      {items.map(({ href, icon, label }) => (
        <li className={styles.item} key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={styles.link}
          >
            {icon}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default Social
