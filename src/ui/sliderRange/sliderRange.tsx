'use client'

import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import Nouislider from 'nouislider-react'

import 'nouislider/distribute/nouislider.css'

import styles from './sliderRange.module.scss'
import { SliderRangeProps } from './sliderRange.types'

const SliderRange: FC<SliderRangeProps> = ({
  className,
  range,
  start,
  ...otherProps
}) => {
  const rootClassName = classNames(styles.root, className)
  const [minLevel, setMinLevel] = useState(start ? start[0] : 0)
  const [maxLevel, setMaxLevel] = useState(start ? start[1] : 100)

  const updateSliderOptions = () => {
    const newStart: [number, number] = [minLevel, maxLevel]
    otherProps.onUpdate?.(newStart)
  }

  useEffect(() => {
    updateSliderOptions()
  })

  const sliderOptions = {
    range,
    start: [minLevel, maxLevel],
    step: 1,
    connect: true
  }

  return (
    <div className={rootClassName}>
      <div className={styles.inputs}>
        <label>
          <input
            type="number"
            name="minLevel"
            value={Number(minLevel).toFixed(0)}
            placeholder="0"
            aria-label="Минимальный уровень"
            onChange={(e) => setMinLevel(parseFloat(e.target.value))}
          />
        </label>
        <label>
          <input
            type="number"
            name="maxLevel"
            value={Number(maxLevel).toFixed(0)}
            placeholder="100"
            aria-label="Максимальный уровень"
            onChange={(e) => setMaxLevel(parseFloat(e.target.value))}
          />
        </label>
      </div>
      <Nouislider
        className={styles.slider}
        {...otherProps}
        {...sliderOptions}
        onUpdate={(renderTargetValues) => {
          setMinLevel(renderTargetValues[0])
          setMaxLevel(renderTargetValues[1])
        }}
      />
    </div>
  )
}

export default SliderRange
