'use client';

import React, { FC, useState, useCallback } from 'react';
import classNames from 'classnames';
import DatePicker, { registerLocale } from 'react-datepicker';
import { addMonths } from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './stepOneDatesOfStay.module.scss';
import { stepOneDatesOfStayProps } from './stepOneDatesOfStay.types';
import StepList from '../formNavigation/formNavigation';

const customRu = {
  ...ru,
  localize: {
    ...ru.localize,
    month: (n: number) => [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ][n],
    day: (n: number) => ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'][n],
  }
};

registerLocale('ru', customRu);

const StepOneDatesOfStay: FC<stepOneDatesOfStayProps> = ({ updateData, nextStep, className }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const today = new Date();
  const maxDate = addMonths(today, 1);

  const handleNext = () => {
    // Implement form validation if needed
    nextStep();
  };

  const rootClassName = classNames(styles.root, className);

  const handleDateChange = useCallback((dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    updateData({ dates });
  }, [updateData]);

  const renderDayContents = useCallback((day: number, date: Date | null) => {
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
  }, [startDate, endDate]);

  return (
    <div className={rootClassName}>
      <div>
        <h2>Шаг 1. Даты пребывания</h2>
        <p></p>
      </div>
      <div>
        <StepList currentStep={0} activeStep={0} setStep={nextStep} />
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
      <button onClick={handleNext}>Следующий шаг</button>
    </div>
  );
};

export default StepOneDatesOfStay;