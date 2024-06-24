import { FC } from 'react'
import { PageHeader } from '@/modules/pageHeader'
import { UserList } from '@/modules/userList'
import classNames from 'classnames'

import { CountriesFilter } from '@/components/countriesFilter'

import styles from './companions.module.scss'
import { CompanionsProps } from './companions.types'

const Companions: FC<CompanionsProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName}>
      <PageHeader className={styles.header}>Попутчики</PageHeader>
      <CountriesFilter />
      <UserList className={styles.list} />
    </main>
  )
}

export default Companions
