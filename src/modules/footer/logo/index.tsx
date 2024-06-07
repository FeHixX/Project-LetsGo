import { FC } from 'react'
import Link from 'next/link'
import LogoDesktop from '@icons/logo-full-footer.svg'
import LogoMobile from '@icons/logo-mobile-footer.svg'

import styles from './logo.module.scss'

const Logo: FC = () => (
  <Link href="/" className={styles.root} aria-label="home">
    <span className={styles.desktop}>
      <LogoDesktop />
    </span>
    <span className={styles.mobile}>
      <LogoMobile />
    </span>
  </Link>
)

export default Logo
