import { FC } from 'react'
import classNames from 'classnames'

import styles from './filters.module.scss'
import { FiltersProps } from './filters.types'

const Filters: FC<FiltersProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  return <div className={rootClassName}></div>
}

export default Filters
