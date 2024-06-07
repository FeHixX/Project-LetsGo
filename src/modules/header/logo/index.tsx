import { FC } from 'react'
import Link from 'next/link'
import LigaLogoIcon from '@icons/header/logo-full.svg'

import styles from './logo.module.scss'

const Logo: FC = () => (
  <Link href="/" className={styles.root} aria-label="home">
    <LigaLogoIcon />
  </Link>
)

export default Logo
