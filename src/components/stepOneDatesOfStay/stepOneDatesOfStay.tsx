import React, { FC, useCallback, useState, useEffect } from 'react';
import classNames from 'classnames';
import { addMonths } from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import DatePicker, { registerLocale } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import PolygonNext from '@icons/polygon-next.svg';
import Minus from '@icons/minus.svg';
import Plus from '@icons/plus.svg';
import IconCheckMark from '@icons/icon-check-mark.svg';

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
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 1024);
  const today = new Date();
  const maxDate = addMonths(today, 1);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      if (start && end && start.getTime() >= end.getTime()) {
        // Если конечная дата меньше или равна начальной, устанавливаем её на следующий день
        const newEnd = new Date(start);
        newEnd.setDate(newEnd.getDate() + 1);
        setStartDate(start);
        setEndDate(newEnd);
      } else {
        setStartDate(start);
        setEndDate(end);
      }
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

  const renderDesktopInputs = () => (
    <div className={styles.inputGroup}>
      <div className={styles.inputCompanionCount}>
        <label className={styles.inputCompanionCountWrapper}>
          ИЩУ ПОПУТЧИКОВ:
          <div className={styles.counter}>
            <div className={styles.counterWrapper}>
              <button
                onClick={() => setCompanionCount(Math.max(1, companionCount - 1))}
                disabled={companionCount <= 1}
              >
                <Minus />
              </button>
              <span>{companionCount}</span>
              <button
                onClick={() => setCompanionCount(Math.min(10, companionCount + 1))}
                disabled={companionCount >= 10}
              >
                <Plus />
              </button>
            </div>
            <span>ЧЕЛ.</span>
          </div>
        </label>

        <label className={styles.inputDurationCountWrapper}>
          ДЛИТЕЛЬНОСТЬ:
          <div className={styles.counter}>
            <div className={styles.counterWrapper}>
              <button
                onClick={() => setDuration(Math.max(2, duration - 1))}
                disabled={duration <= 2}
              >
                <Minus />
              </button>
              <span>{duration}</span>
              <button
                onClick={() => setDuration(Math.min(31, duration + 1))}
                disabled={duration >= 31}
              >
                <Plus />
              </button>
            </div>
            <span>ДН.</span>
          </div>
        </label>
      </div>
      <label className={styles.inputChildrenWrapper}>
        <input
          type="checkbox"
          checked={children}
          onChange={() => setChildren(!children)}
        />
        <span className={styles.mark}>
          <IconCheckMark />
        </span>
      </label>
    </div>
  );

  const renderMobileInputs = () => (
    <div className={styles.inputGroup}>
      <div className={styles.inputCompanionCount}>
        <label className={styles.inputChildrenWrapper}>
          <input
            type="checkbox"
            checked={children}
            onChange={() => setChildren(!children)}
          />
          <span className={styles.mark}>
            <IconCheckMark />
          </span>
        </label>
        <label className={styles.inputCompanionCountWrapper}>
          <div className={styles.inputCompanionCountSpan}>
            <span>ИЩУ ПОПУТЧИКОВ:</span>
            <span className={styles.inputCompanionSecond}>ЧЕЛ.</span>
          </div>
          <div className={styles.counter}>
            <div className={styles.counterWrapper}>
              <button
                onClick={() => setCompanionCount(Math.max(1, companionCount - 1))}
                disabled={companionCount <= 1}
              >
                <Minus />
              </button>
              <span>{companionCount}</span>
              <button
                onClick={() => setCompanionCount(Math.min(10, companionCount + 1))}
                disabled={companionCount >= 10}
              >
                <Plus />
              </button>
            </div>
          </div>
        </label>

        <label className={styles.inputDurationCountWrapper}>
          <div className={styles.inputCompanionCountSpan}>
            <span>ДЛИТЕЛЬНОСТЬ:</span>
            <span className={styles.inputCompanionSecond}>ДН.</span>
          </div>
          <div className={styles.counter}>
            <div className={styles.counterWrapper}>
              <button
                onClick={() => setDuration(Math.max(2, duration - 1))}
                disabled={duration <= 2}
              >
                <Minus />
              </button>
              <span>{duration}</span>
              <button
                onClick={() => setDuration(Math.min(31, duration + 1))}
                disabled={duration >= 31}
              >
                <Plus />
              </button>
            </div>
          </div>
        </label>
      </div>
    </div>
  );

  return (
    <div className={rootClassName}>
      <div className={styles.formHead}>
        <div className={styles.formDescription}>
          <h2 className={styles.formTitle}>Шаг 1. Даты пребывания</h2>
          <p className={styles.formSubtitle}>
            Укажите предпочтительное количество попутчиков, которых <br />
            вы хотели бы позвать в поездку, и ее предполагаемую длительность.
          </p>
        </div>
        <StepList currentStep={0} activeStep={0} setStep={nextStep} />
      </div>
      {isMobile ? renderMobileInputs() : renderDesktopInputs()}
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