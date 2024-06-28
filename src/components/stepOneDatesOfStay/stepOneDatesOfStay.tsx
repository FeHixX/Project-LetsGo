'use client'

import React, { FC, useCallback, useState } from 'react'
import classNames from 'classnames'
import { addMonths } from 'date-fns'
import { ru } from 'date-fns/locale/ru'
import DatePicker, { registerLocale } from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

import PolygonNext from '@icons/polygon-next.svg'

import StepList from '../formNavigation/formNavigation'
import styles from './stepOneDatesOfStay.module.scss'
import { StepOneDatesOfStayProps } from './stepOneDatesOfStay.types'

const customRu = {
  ...ru,
  localize: {
    ...ru.localize,
    month: (n: number) =>
      [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
      ][n],
    day: (n: number) => ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'][n]
  }
}

registerLocale('ru', customRu)

const StepOneDatesOfStay: FC<StepOneDatesOfStayProps> = ({
  updateData,
  nextStep,
  className
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [companions, setCompanions] = useState<number>(2)
  const [duration, setDuration] = useState<number>(3)
  const [withChildren, setWithChildren] = useState<boolean>(true)
  const today = new Date()
  const maxDate = addMonths(today, 1)

  const handleNext = () => {
    // Implement form validation if needed
    nextStep()
  }

  const rootClassName = classNames(styles.root, className)

  const handleDateChange = useCallback(
    (dates: [Date | null, Date | null]) => {
      const [start, end] = dates
      setStartDate(start)
      setEndDate(end)
      updateData({ dates: dates.map((date) => date?.toISOString() || '') })
    },
    [updateData]
  )

  const renderDayContents = useCallback(
    (day: number, date: Date | null) => {
      let label = null
      if (startDate && date?.getTime() === startDate.getTime()) {
        label = 'Заезд'
      } else if (endDate && date?.getTime() === endDate.getTime()) {
        label = 'Выезд'
      }

      return (
        <div>
          <span>{day}</span>
          {label && <span>{label}</span>}
        </div>
      )
    },
    [startDate, endDate]
  )

  return (
    <div className={rootClassName}>
      <div className={styles.formHead}>
        <div className={styles.formDescription}>
          <h2>Шаг 1. Даты пребывания</h2>
          <p>
            Укажите предпочтительное количество попутчиков, которых <br />
            вы хотели бы позвать в поездку, и ее предполагаемую длительность.
          </p>
        </div>
        <StepList currentStep={0} activeStep={0} setStep={nextStep} />
      </div>
      <div className={styles.inputGroup}>
        <div className={styles.inputCompanions}>
          <label>
            Ищу попутчиков:
            <div className={styles.counter}>
              <button
                onClick={() => setCompanions(Math.max(1, companions - 1))}
              >
                -
              </button>
              <span>{companions}</span>
              <button onClick={() => setCompanions(companions + 1)}>+</button>
              <span>чел.</span>
            </div>
          </label>
          <label>
            Длительность:
            <div className={styles.counter}>
              <button onClick={() => setDuration(Math.max(1, duration - 1))}>
                -
              </button>
              <span>{duration}</span>
              <button onClick={() => setDuration(duration + 1)}>+</button>
              <span>дн.</span>
            </div>
          </label>
        </div>
        <label>
          <input
            type="checkbox"
            checked={withChildren}
            onChange={() => setWithChildren(!withChildren)}
          />
          Можно с детьми
        </label>
      </div>
      <div className={styles.dateWrapper}>
        <DatePicker
          selected={startDate || undefined}
          onChange={handleDateChange}
          startDate={startDate || undefined}
          endDate={endDate || undefined}
          selectsRange
          inline
          minDate={today}
          maxDate={maxDate}
          locale="ru"
          fixedHeight
          renderDayContents={renderDayContents}
        />
      </div>
      <button className={styles.formButton} onClick={handleNext}>
        Следующий шаг
        <PolygonNext></PolygonNext>
      </button>
    </div>
  )
}

export default StepOneDatesOfStay
