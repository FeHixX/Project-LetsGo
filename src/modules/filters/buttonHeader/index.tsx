import { FC } from 'react'
import IconFilterArrow from '@icons/icon-filter-arrow.svg'
import classNames from 'classnames'

import styles from './buttonHeader.module.scss'
import { ButtonHeaderProps } from './buttonHeader.types'

const ButtonHeader: FC<ButtonHeaderProps> = ({ className, title, onClick }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <button className={rootClassName} type="button" onClick={onClick}>
      {title}
      <span>:</span>
      <IconFilterArrow />
    </button>
  )
}

export default ButtonHeader
