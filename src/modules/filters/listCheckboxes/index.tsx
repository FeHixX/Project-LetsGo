import { FC } from 'react'
import { CustomCheckbox } from '@/ui'
import classNames from 'classnames'

import styles from './listCheckboxes.module.scss'
import { ListCheckboxesProps } from './listCheckboxes.types'

const ListCheckboxes: FC<ListCheckboxesProps> = ({ items, className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <ul className={rootClassName}>
      {items.map(({ name, value, label }) => (
        <li className={styles.item} key={label}>
          <CustomCheckbox name={name} value={value} label={label} />
        </li>
      ))}
    </ul>
  )
}

export default ListCheckboxes
