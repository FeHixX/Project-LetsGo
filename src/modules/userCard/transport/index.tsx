import { FC } from 'react'
import classNames from 'classnames'

import styles from './transport.module.scss'
import { TransportProps } from './transport.types'

const Transport: FC<TransportProps> = ({ items, className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <span>Транспорт:</span>
      <ul className={styles.list}>
        {items.map(({ icon, checked, label }, index) => (
          <li key={index} data-checked={checked}>
            <span>{label}</span>
            {icon}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Transport
