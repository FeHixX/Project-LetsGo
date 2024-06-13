'use client';

import { FC, useState, useCallback } from 'react';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import { format, isSameDay, isAfter } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

import styles from './datesOfStay.module.scss';
import { DatesOfStayProps } from './datesOfStay.types';

interface CustomHeaderProps {
  date: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
}

const DatesOfStay: FC<DatesOfStayProps> = ({ className }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const rootClassName = classNames(styles.root, className);

  const renderCustomHeader = useCallback(
    ({
      date,
      decreaseMonth,
      increaseMonth,
      prevMonthButtonDisabled,
      nextMonthButtonDisabled,
    }: CustomHeaderProps) => (
      <div className={styles.header}>
        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className={styles.navButton}>
          &lt;
        </button>
        <span className={styles.dateDisplay}>{format(date, 'LLLL yyyy')}</span>
        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} className={styles.navButton}>
          &gt;
        </button>
      </div>
    ),
    []
  );

  const handleDateChange = useCallback(
    (date: Date | null) => {
      if (!startDate || (startDate && endDate)) {
        setStartDate(date);
        setEndDate(null);
      } else if (startDate && !endDate && date && isAfter(date, startDate)) {
        setEndDate(date);
      } else {
        setStartDate(date);
        setEndDate(null);
      }
    },
    [startDate, endDate]
  );

  const renderDayContents = useCallback(
    (day: number, date: Date) => {
      let className = '';

      if (startDate && endDate && date >= startDate && date <= endDate) {
        className = styles.highlight;
      } else if (startDate && isSameDay(date, startDate)) {
        className = styles.start;
      } else if (endDate && isSameDay(date, endDate)) {
        className = styles.end;
      }

      return <div className={className}>{day}</div>;
    },
    [startDate, endDate]
  );

  return (
    <div className={rootClassName}>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        inline
        renderCustomHeader={renderCustomHeader}
        renderDayContents={renderDayContents}
        selectsStart
        startDate={startDate || undefined}
        endDate={endDate || undefined}
      />
    </div>
  );
};

export default DatesOfStay;
