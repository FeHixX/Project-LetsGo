import { FC } from 'react'
import IconNext from '@icons/arrow-next.svg'
import IconPrev from '@icons/arrow-prev.svg'
import classNames from 'classnames'

import styles from './pagination.module.scss'
import { PaginationProps } from './pagination.types'

const Pagination: FC<PaginationProps> = ({ className, currentPage, totalPages, onPageChange }) => {
  const rootClassName = classNames(styles.root, className)

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className={rootClassName}>
      <ul className={styles.list}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page}>
            <button
              className={classNames(styles.pageButton, { [styles.current]: page === currentPage })}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.arrows}>
        <button type="button" onClick={handlePrevClick} disabled={currentPage === 1}>
          <IconPrev />
        </button>
        <button type="button" onClick={handleNextClick} disabled={currentPage === totalPages}>
          <IconNext />
        </button>
      </div>
    </div>
  )
}

export default Pagination