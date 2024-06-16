import { FC } from 'react'
import classNames from 'classnames'

import styles from './progressCircle.module.scss'
import { ProgressCircleProps } from './progressCircle.types'

const ProgressCircle: FC<ProgressCircleProps> = ({ className, level }) => {
  const rootClassName = classNames(styles.root, className)
  const strokeWidth = 3
  const radius = 50 - strokeWidth / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (level / 100) * circumference

  return (
    <svg
      className={rootClassName}
      width="100%"
      height="100%"
      viewBox={`0 0 ${2 * (radius + strokeWidth / 2)} ${2 * (radius + strokeWidth / 2)}`}
      preserveAspectRatio="none"
    >
      <circle
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={radius + strokeWidth / 2}
        cy={radius + strokeWidth / 2}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform={`rotate(-90 ${radius + strokeWidth / 2} ${radius + strokeWidth / 2})`}
      />
    </svg>
  )
}

export default ProgressCircle
