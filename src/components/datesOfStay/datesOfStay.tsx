'use client';

import React, { FC, useState, useCallback } from 'react';
import classNames from 'classnames';
import DatePicker, { registerLocale } from 'react-datepicker';
import { addMonths } from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './datesOfStay.module.scss';
import { DatesOfStayProps } from './datesOfStay.types';

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

const DatesOfStay: FC<DatesOfStayProps> = ({ className }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const today = new Date();
  const maxDate = addMonths(today, 1);

  const rootClassName = classNames(styles.root, className);

  const handleDateChange = useCallback((dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  }, []);

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
    </div>
  );
};

export default DatesOfStay;
