import { FC } from 'react'
import Image from 'next/image'
import { Pagination } from '@/modules/pagination'
import { SectionHeader } from '@/modules/sectionHeader'
import { Wrapper } from '@/ui'
import classNames from 'classnames'
import { Accordion } from '@/ui';

import styles from './home.module.scss'
import { HomeProps } from './home.types'

const Home: FC<HomeProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)
  
  const accordionItems = [
    {
      title: 'Первый',
      content: 'Тест 1',
    },
    {
      title: 'Второй',
      content: 'Тест 2',
    },
    {
      title: 'Третий',
      content: 'Тест 3',
    },
  ];

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
        <Accordion items={accordionItems} />
        <Pagination />
      </Wrapper>
    </main>
  )
}

export default Home
