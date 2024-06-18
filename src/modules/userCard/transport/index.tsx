import { FC } from 'react'
import classNames from 'classnames'

import styles from './transport.module.scss'
import { TransportProps } from './transport.types'

const Transport: FC<TransportProps> = ({ item, className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <ul className={rootClassName}>
      {item.map(({ icon, checked }, index) => (
        <li className={checked ? styles.checked : ''} key={index}>
          {icon}
        </li>
      ))}
    </ul>
  )
}

export default Transport
