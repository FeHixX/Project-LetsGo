import React, { FC, useCallback, useState } from 'react';
import classNames from 'classnames';
import { addMonths } from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import DatePicker, { registerLocale } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import PolygonNext from '@icons/polygon-next.svg';

import StepList from '../formNavigation/formNavigation';
import styles from './stepOneDatesOfStay.module.scss';
import { StepOneDatesOfStayProps } from './stepOneDatesOfStay.types';

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
};

registerLocale('ru', customRu);

const StepOneDatesOfStay: FC<StepOneDatesOfStayProps> = ({
  updateData,
  nextStep,
  className,
  data
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [companionCount, setCompanionCount] = useState<number>(1);
  const [duration, setDuration] = useState<number>(2);
  const [children, setChildren] = useState<boolean>(data.children);
  const today = new Date();
  const maxDate = addMonths(today, 1);

  const handleNext = () => {
    const formatDateToISOString = (date: Date | null) => {
      if (!date) return '';
      return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString();
    };

    updateData({
      dates: [formatDateToISOString(startDate), formatDateToISOString(endDate)],
      numPeople: companionCount,
      duration: duration,
      children: children
    });
    nextStep();
  };

  const rootClassName = classNames(styles.root, className);

  const handleDateChange = useCallback(
    (dates: [Date | null, Date | null]) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    },
    []
  );

  const renderDayContents = useCallback(
    (day: number, date: Date | null) => {
      let label = null;
      if (startDate && date?.getTime() === startDate.getTime()) {
        label = 'Заезд';
      } else if (endDate && date?.getTime() === endDate.getTime()) {
        label = 'Выезд';
      }

      return (
        <div>
          <span>{day}</span>
          {label && <span>{label}</span>}
        </div>
      );
    },
    [startDate, endDate]
  );

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
        <div className={styles.inputCompanionCount}>
          <label>
            Ищу попутчиков:
            <div className={styles.counter}>
              <button
                onClick={() => setCompanionCount(Math.max(1, companionCount - 1))}
                disabled={companionCount <= 1}
              >
                -
              </button>
              <span>{companionCount}</span>
              <button
                onClick={() => setCompanionCount(Math.min(10, companionCount + 1))}
                disabled={companionCount >= 10}
              >
                +
              </button>
              <span>чел.</span>
            </div>
          </label>
          <label>
            Длительность:
            <div className={styles.counter}>
              <button
                onClick={() => setDuration(Math.max(2, duration - 1))}
                disabled={duration <= 2}
              >
                -
              </button>
              <span>{duration}</span>
              <button
                onClick={() => setDuration(Math.min(31, duration + 1))}
                disabled={duration >= 31}
              >
                +
              </button>
              <span>дн.</span>
            </div>
          </label>
        </div>
        <label>
          <input
            type="checkbox"
            checked={children}
            onChange={() => setChildren(!children)}
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
          placeholderText="Выберите даты"
        />
      </div>
      <div className={styles.buttons}>
        <button className={`${styles.formButton} ${styles.formButtonNext}`} onClick={handleNext}>
          Следующий шаг
          <PolygonNext />
        </button>
      </div>
    </div>
  );
};

export default StepOneDatesOfStay;
