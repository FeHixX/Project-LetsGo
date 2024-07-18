'use client'

import { FC, useState } from 'react'
import IconHeart from '@icons/icon-heart.svg'
import classNames from 'classnames'

import styles from './like.module.scss'
import { LikeProps } from './like.types'

const Like: FC<LikeProps> = ({ className, initialCounter }) => {
  const [counter, setCounter] = useState(initialCounter)
  const [isCounterTrue, setIsCounterTrue] = useState(false)

  const rootClassName = classNames(styles.root, className)

  const handleButtonClick = () => {
    if (!isCounterTrue) {
      setCounter(counter + 1)
      setIsCounterTrue(true)
    } else {
      setCounter(counter - 1)
      setIsCounterTrue(false)
    }
  }

  return (
    <div className={rootClassName}>
      <button
        type="button"
        data-counter={isCounterTrue}
        onClick={handleButtonClick}
      >
        <IconHeart />
      </button>
      <span data-counter="like">{counter}</span>
    </div>
  )
}

export default Like
