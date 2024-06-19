import { FC } from 'react';
import classNames from 'classnames';

import styles from './stepTwoItinerary.module.scss';
import { StepTwoItineraryProps } from './stepTwoItinerary.types';

const StepTwoItinerary: FC<StepTwoItineraryProps> = ({ className, nextStep, prevStep }) => {
  const rootClassName = classNames(styles.root, className);

  const handleNext = () => {
    nextStep();
  };

  const handlePrev = () => {
    prevStep();
  };

  return (
    <div className={rootClassName}>
      <div>
        <h2>Шаг 2. Маршрут</h2>
        <button onClick={handlePrev}>На шаг назад</button>
        <button onClick={handleNext}>Следующий шаг</button>
      </div>
    </div>
  );
};

export default StepTwoItinerary;
