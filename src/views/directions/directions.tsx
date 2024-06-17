import { FC } from 'react'
import { PageHeader } from '@/modules/pageHeader'
import { User } from '@/modules/user'
import { DatesOfStay } from '@/components'
import classNames from 'classnames'

import styles from './directions.module.scss'
import { DirectionsProps } from './directions.types'

const Directions: FC<DirectionsProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName}>
      <PageHeader className={styles.header}>Направления</PageHeader>
      <User />
      <DatesOfStay></DatesOfStay>
    </main>
  )
}

export default Directions
