import { FC } from 'react'
import { PageHeader } from '@/modules/pageHeader'
import { UserList } from '@/modules/userList'
import classNames from 'classnames'

import styles from './companions.module.scss'
import { CompanionsProps } from './companions.types'

const Companions: FC<CompanionsProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName}>
      <PageHeader className={styles.header}>Попутчики</PageHeader>
      <UserList className={styles.list} />
    </main>
  )
}

export default Companions
