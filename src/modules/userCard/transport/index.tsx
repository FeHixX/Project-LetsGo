import { FC } from 'react'
import classNames from 'classnames'

import styles from './transport.module.scss'
import { TransportProps } from './transport.types'

const Transport: FC<TransportProps> = ({ item, className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <span>Транспорт:</span>
      <ul className={styles.list}>
        {item.map(({ icon, checked }, index) => (
          <li key={index} data-checked={checked}>
            {icon}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Transport
