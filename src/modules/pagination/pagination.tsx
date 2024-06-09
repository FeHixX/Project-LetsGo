import { FC } from 'react'
import IconNext from '@icons/arrow-next.svg'
import IconPrev from '@icons/arrow-prev.svg'
import classNames from 'classnames'

import styles from './pagination.module.scss'
import { PaginationProps } from './pagination.types'

const Pagination: FC<PaginationProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <ul className={styles.list}>
        <li>
          <span className={styles.current}>1</span>
        </li>
        <li>
          <a href="#">2</a>
        </li>
        <li>
          <a href="#">3</a>
        </li>
        <li>
          <a href="#">4</a>
        </li>
      </ul>
      <div className={styles.arrows}>
        <button type="button">
          <IconPrev />
        </button>
        <button type="button">
          <IconNext />
        </button>
      </div>
    </div>
  )
}

export default Pagination
