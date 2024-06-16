import { FC } from 'react'
import Link from 'next/link'
import LogoDesktopBlack from '@icons/logo-full-black.svg'
import LogoDesktopWhite from '@icons/logo-full-white.svg'
import LogoMobileBlack from '@icons/logo-mobile-black.svg'
import LogoMobileWhite from '@icons/logo-mobile-white.svg'

import styles from './logo.module.scss'

const Logo: FC<{ active: boolean }> = ({ active }) => (
  <Link
    href="/"
    className={active ? styles.activeroot : styles.root}
    aria-label="home"
  >
    <span
      className={
        active ? `${styles.desktop} ${styles.activedesktop}` : styles.desktop
      }
    >
      <LogoDesktopWhite className={styles.white} />
      <LogoDesktopBlack className={styles.black} />
    </span>
    <span
      className={
        active ? `${styles.mobile} ${styles.activemobile}` : styles.mobile
      }
    >
      <LogoMobileWhite className={styles.white} />
      <LogoMobileBlack className={styles.black} />
    </span>
  </Link>
)

export default Logo
