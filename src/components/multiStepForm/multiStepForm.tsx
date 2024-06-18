'use client';

import React, { FC, useState } from 'react';
import { StepTwoItinerary } from '../stepTwoItinerary/stepTwoItinerary';
import { StepThreePastime } from '../stepThreePastime/stepThreePastime';
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

const MultiStepForm: FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    stayDates: { numPeople: 2, duration: 3, dates: ['2019-03-26', '2019-03-27', '2019-03-28'] },
    route: { countries: ['Босния', 'Чехия'] },
    activities: { Bosnia: '', Czechia: 'Пить пиво и лазить по старым замкам...' }
  });

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <div className={styles.multiStepForm}>
      {step === 1 && <StepOneDatesOfStay data={formData.stayDates} updateData={updateFormData} nextStep={nextStep} />}
      {step === 2 && <StepTwoItinerary data={formData.route} updateData={updateFormData} nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <StepThreePastime data={formData.activities} updateData={updateFormData} prevStep={prevStep} />}
    </div>
  );
};

export default MultiStepForm;