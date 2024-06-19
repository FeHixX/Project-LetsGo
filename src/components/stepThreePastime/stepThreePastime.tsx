// StepThreePastime.tsx

import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './stepThreePastime.module.scss';
import StepList from '../formNavigation/formNavigation';

export interface StepThreePastimeProps {
  className?: string;
  data: { Bosnia: string; Czechia: string };
  updateData: (data: Partial<{ Bosnia: string; Czechia: string }>) => void;
  prevStep: () => void;
}

const StepThreePastime: FC<StepThreePastimeProps> = ({ className, prevStep }) => {
  const rootClassName = classNames(styles.root, className);

  const handlePrev = () => {
    prevStep();
  };

  return (
    <div className={rootClassName}>
      <div>
        <div className={styles.formHead}>
      <div className={styles.formDescription}>
        <h2>Шаг 3. Деятельность</h2>
        <p>Наконец, расскажите о своих планах времяпровождения.<br/>
          Можно писать в свободной форме и ставить тэги.
          </p>
      </div>
        <StepList currentStep={2} activeStep={2} setStep={() => {}} />
      </div>
        <button onClick={handlePrev}>На шаг назад</button>
      </div>
    </div>
  );
};

export default StepThreePastime;
