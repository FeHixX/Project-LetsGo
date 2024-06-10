import { FC } from 'react'
import Image from 'next/image'
import { Pagination } from '@/modules/pagination'
import { SectionHeader } from '@/modules/sectionHeader'
import { Wrapper } from '@/ui'
import classNames from 'classnames'

import styles from './home.module.scss'
import { HomeProps } from './home.types'

const Home: FC<HomeProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName}>
      <SectionHeader>Направления</SectionHeader>
      <Wrapper>
        <Image
          src={`${process.env.NODE_ENV === 'production' ? '/intern-pognali-1-6' : ''}/images/sticker-dino.png`}
          width={512}
          height={492}
          quality={85}
          alt="Ligazavr"
          className={styles.image}
        />
        <Pagination />
      </Wrapper>
    </main>
  )
}

export default Home
