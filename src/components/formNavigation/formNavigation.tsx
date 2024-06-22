import { FC } from 'react'
import classNames from 'classnames'

import styles from './formNavigation.module.scss'
import { FormNavigationProps } from './formNavigation.types'

const StepList: FC<FormNavigationProps & { activeStep: number }> = ({
  className,
  activeStep
}) => {
  const rootClassName = classNames(styles.root, className)

  const steps = ['ДАТЫ', 'МАРШРУТ', 'РАЗВЛЕЧЕНИЯ']

  return (
    <div className={rootClassName}>
      <ul className={styles.list}>
        {steps.map((step, index) => (
          <li key={index} className={index === activeStep ? styles.active : ''}>
            {step}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StepList

//Заготовка списка навигации для многошаговой формы направления, на случай если понадобится навигация.)

// import React, { FC } from 'react';
// import styles from './formNavigation.module.scss';
// import classNames from 'classnames'
// import { FormNavigationProps } from './formNavigation.types';

// const FormNavigation: FC<FormNavigationProps> = ({ currentStep, setStep, className }) => {
//   const rootClassName = classNames(styles.root, className)
//   return (
//     <div className={rootClassName}>
//     <nav className={styles.menuNavigation}>
//       <ul>
//         <li
//           className={currentStep === 1 ? styles.active : ''}
//           onClick={() => setStep(1)}
//         >
//           ДАТЫ
//         </li>
//         <li
//           className={currentStep === 2 ? styles.active : ''}
//           onClick={() => setStep(2)}
//         >
//           МАРШРУТ
//         </li>
//         <li
//           className={currentStep === 3 ? styles.active : ''}
//           onClick={() => setStep(3)}
//         >
//           РАЗВЛЕЧЕНИЯ
//         </li>
//       </ul>
//     </nav>
//     </div>
//   );
// };

// export default FormNavigation;
