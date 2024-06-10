import { FC } from 'react'
import { Pagination } from '@/modules/pagination'
import { Heading, Wrapper } from '@/ui'
import classNames from 'classnames'

import styles from './companions.module.scss'
import { CompanionsProps } from './companions.types'

const Companions: FC<CompanionsProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName}>
      <Wrapper>
        <Heading tagName="h1" className={styles.title}>
          Здесь страница Попутчики CATALOG
        </Heading>
        <Pagination />
      </Wrapper>
    </main>
  )
}

export default Companions
