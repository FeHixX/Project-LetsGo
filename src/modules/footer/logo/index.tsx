import { FC } from 'react'
import Link from 'next/link'
import LogoDesktop from '@icons/logo-full-footer.svg'
import LogoMobile from '@icons/logo-mobile-footer.svg'
import classNames from 'classnames'

import styles from './logo.module.scss'
import { LogoProps } from './logo.types'

const Logo: FC<LogoProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <Link href="/" className={rootClassName} aria-label="home">
      <span className={styles.desktop}>
        <LogoDesktop />
      </span>
      <span className={styles.mobile}>
        <LogoMobile />
      </span>
    </Link>
  )
}

export default Logo
