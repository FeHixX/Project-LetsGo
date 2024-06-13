import { FC } from 'react'
import { Pagination } from '@/modules/pagination'
import { Heading, Wrapper } from '@/ui'
import classNames from 'classnames'

import styles from './directions.module.scss'
import { DirectionsProps } from './directions.types'
import { DatesOfStay } from '@/components'

const Directions: FC<DirectionsProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName}>
      <Wrapper>
        <Heading tagName="h1" className={styles.title}>
          Здесь страница Направления FORM
        </Heading>
        <DatesOfStay></DatesOfStay>
        <Pagination />
      </Wrapper>
    </main>
  )
}

export default Directions
