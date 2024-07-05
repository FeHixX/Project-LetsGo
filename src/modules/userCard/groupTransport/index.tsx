import { FC } from 'react'
import classNames from 'classnames'

import LevelWrapper from '../levelWrapper'
import Transport from '../transport'
import styles from './groupTransport.module.scss'
import { GroupTransportProps } from './groupTransport.types'

const GroupTransport: FC<GroupTransportProps> = ({
  className,
  userLevel,
  items
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <Transport className={styles.transport} items={items} />
      <LevelWrapper className={styles.level} level={userLevel} />
    </div>
  )
}

export default GroupTransport
