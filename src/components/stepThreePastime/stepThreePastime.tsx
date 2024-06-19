import { FC } from 'react';
import classNames from 'classnames';

import styles from './StepThreePastime.module.scss';
import { StepThreePastimeProps } from './stepThreePastime.types';

export const StepThreePastime: FC<StepThreePastimeProps> = ({ className, data, prevStep }) => {
  const rootClassName = classNames(styles.root, className);
  
  const handlePrev = () => {
    prevStep();
  };

  const handleSubmit = () => {
    console.log('Form submitted:', data);
  };

  return (
    <div className={rootClassName}>
      <div>
        <h2>Шаг 3. Развлечения</h2>
        <button onClick={handlePrev}>На шаг назад</button>
        <button onClick={handleSubmit}>Отправить</button>
      </div>
    </div>
  );
};

export default StepThreePastime;