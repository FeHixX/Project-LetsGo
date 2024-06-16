import { FC } from 'react'
import { ProgressCircle } from '@/ui'
import classNames from 'classnames'

import styles from './level.module.scss'
import { LevelProps } from './level.types'

const Level: FC<LevelProps> = ({ level, className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <ProgressCircle level={level} />
      <p>
        {level} <span>level</span>
      </p>
    </div>
  )
}

export default Level
