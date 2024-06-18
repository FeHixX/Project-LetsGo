import React, { FC } from 'react';
import styles from './formNavigation.module.scss';
import classNames from 'classnames'
import { FormNavigationProps } from './formNavigation.types';

const FormNavigation: FC<FormNavigationProps> = ({ currentStep, setStep, className }) => {
  const rootClassName = classNames(styles.root, className)
  return (
    <div className={rootClassName}>
    <nav className={styles.menuNavigation}>
      <ul>
        <li
          className={currentStep === 1 ? styles.active : ''}
          onClick={() => setStep(1)}
        >
          ДАТЫ
        </li>
        <li
          className={currentStep === 2 ? styles.active : ''}
          onClick={() => setStep(2)}
        >
          МАРШРУТ
        </li>
        <li
          className={currentStep === 3 ? styles.active : ''}
          onClick={() => setStep(3)}
        >
          РАЗВЛЕЧЕНИЯ
        </li>
      </ul>
    </nav>
    </div>
  );
};

export default FormNavigation;
