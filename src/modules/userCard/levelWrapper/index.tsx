import { FC } from 'react'
import { Level } from '@/modules/level'
import classNames from 'classnames'

import styles from './levelWrapper.module.scss'
import { LevelWrapperProps } from './levelWrapper.types'

const LevelWrapper: FC<LevelWrapperProps> = ({ level, className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <span>Левел:</span>
      <Level level={level} className={styles.level} />
    </div>
  )
}

export default LevelWrapper
