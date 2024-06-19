import { FC } from 'react';
import classNames from 'classnames';
import Polygon from '@icons/polygon.svg'

import styles from './stepTwoItinerary.module.scss';
import { StepTwoItineraryProps } from './stepTwoItinerary.types';
import StepList from '../formNavigation/formNavigation';

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
        <div className={styles.formHead}>
      <div className={styles.formDescription}>
        <h2>Шаг 2. Маршрут</h2>
        <p>Укажите страны, которые вы хотели бы посетить. <br/>
            Это может быть одна или сразу несколько.</p>
      </div>
        <StepList currentStep={1} activeStep={1} setStep={nextStep} />
      </div>
        <button onClick={handlePrev}>На шаг назад</button>
        <button className={styles.formButton} onClick={handleNext}>Следующий шаг
        <Polygon></Polygon>
      </button>
      </div>
    </div>
  );
};

export default StepTwoItinerary;
