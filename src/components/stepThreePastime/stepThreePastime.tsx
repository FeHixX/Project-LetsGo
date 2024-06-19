// StepThreePastime.tsx

import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './stepThreePastime.module.scss';

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
        <h2>Шаг 3. Деятельность</h2>
        <button onClick={handlePrev}>На шаг назад</button>
      </div>
    </div>
  );
};

export default StepThreePastime;
