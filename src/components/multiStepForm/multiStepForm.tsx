'use client';

import React, { FC, useState } from 'react';
import classNames from 'classnames';
import StepTwoItinerary from '../stepTwoItinerary/stepTwoItinerary';
import StepThreePastime from '../stepThreePastime/stepThreePastime';
import StepOneDatesOfStay from '../stepOneDatesOfStay/stepOneDatesOfStay';
import styles from './multiStepForm.module.scss';

interface FormData {
  stayDates: {
    numPeople: number;
    duration: number;
    dates: string[];
  };
  route: {
    countries: string[];
  };
  activities: {
    Bosnia: string;
    Czechia: string;
  };
}

const MultiStepForm: FC<{ className?: string }> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    stayDates: { numPeople: 2, duration: 3, dates: ['2019-03-26', '2019-03-27', '2019-03-28'] },
    route: { countries: ['Босния', 'Чехия'] },
    activities: { Bosnia: '', Czechia: 'Пить пиво и лазить по старым замкам...' }
  });

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const updateStayDates = (newData: Partial<FormData['stayDates']>) => {
    setFormData((prevData) => ({ ...prevData, stayDates: { ...prevData.stayDates, ...newData } }));
  };

  const updateRoute = (newData: FormData['route']) => {
    setFormData((prevData) => ({ ...prevData, route: newData }));
  };

  const updateActivities = (newData: Partial<FormData['activities']>) => {
    setFormData((prevData) => ({ ...prevData, activities: { ...prevData.activities, ...newData } }));
  };

  return (
    <section className={rootClassName}>
      <div className={styles.multiStepForm}>
        <h2 className={styles.multiStepFormTitle}>Добавить план:</h2>
        {step === 1 && <StepOneDatesOfStay data={formData.stayDates} updateData={updateStayDates} nextStep={nextStep} />}
        {step === 2 && <StepTwoItinerary data={formData.route} updateData={updateRoute} nextStep={nextStep} prevStep={prevStep} />}
        {step === 3 && <StepThreePastime data={formData.activities} updateData={updateActivities} prevStep={prevStep} />}
      </div>
    </section>
  );
};

export default MultiStepForm;
