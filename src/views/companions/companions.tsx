import { FC } from 'react'
import { PageHeader } from '@/modules/pageHeader'
import { Pagination } from '@/modules/pagination'
import { Wrapper } from '@/ui'
import classNames from 'classnames'

import styles from './companions.module.scss'
import { CompanionsProps } from './companions.types'

const Companions: FC<CompanionsProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName}>
      <PageHeader className={styles.header}>Попутчики</PageHeader>
      <Wrapper>
        <Pagination />
      </Wrapper>
    </main>
  )
}

export default Companions
