import { FC } from 'react'
import IconCheckMark from '@icons/icon-check-mark.svg'
import classNames from 'classnames'

import styles from './customCheckbox.module.scss'
import { CustomCheckboxProps } from './customCheckbox.types'

const CustomCheckbox: FC<CustomCheckboxProps> = ({
  className,
  name,
  value,
  label
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <label>
        <input type="checkbox" name={name} value={value} />
        <span className={styles.mark}>
          <IconCheckMark />
        </span>
        <span className={styles.label}>{label}</span>
      </label>
    </div>
  )
}

export default CustomCheckbox
