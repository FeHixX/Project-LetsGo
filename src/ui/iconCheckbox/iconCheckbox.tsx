import { FC } from 'react'
import classNames from 'classnames'

import styles from './iconCheckbox.module.scss'
import { IconCheckboxProps } from './iconCheckbox.types'

const IconCheckbox: FC<IconCheckboxProps> = ({ items, className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <ul className={rootClassName}>
      {items.map(({ label, value, name, icon }) => (
        <li className={styles.item} key={value}>
          <label>
            <span className="visually-hidden">{label}</span>
            <input type="checkbox" value={value} name={name} />
            {icon}
          </label>
        </li>
      ))}
    </ul>
  )
}

export default IconCheckbox
