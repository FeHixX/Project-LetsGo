import React, { FC, useState } from 'react';
import classNames from 'classnames';
import StepTwoItinerary from '../stepTwoItinerary/stepTwoItinerary';
import StepThreePastime from '../stepThreePastime/stepThreePastime';
import StepOneDatesOfStay from '../stepOneDatesOfStay/stepOneDatesOfStay';
import styles from './multiStepForm.module.scss';

interface Country {
  name: { common: string; rus: string };
  flags: {
    png: string;
    svg: string;
  };
  continent: string[];
  island: boolean;
  description?: string;
}

interface FormData {
  stayDates: {
    numPeople: number;
    duration: number;
    dates: string[];
  };
  route: Country[];
  activities: {
    [key: string]: string;
  };
}

const MultiStepForm: FC<{ className?: string }> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    stayDates: { numPeople: 2, duration: 3, dates: ['2019-03-26', '2019-03-27', '2019-03-28'] },
    route: [],
    activities: { Bosnia: '', Czechia: 'Пить пиво и лазить по старым замкам...' }
  });

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const updateStayDates = (newData: Partial<FormData['stayDates']>) => {
    setFormData((prevData) => ({ ...prevData, stayDates: { ...prevData.stayDates, ...newData } }));
  };

  const updateRoute = (newRoute: { countries: string[] }) => {
    const updatedCountries = newRoute.countries.map((rusName) => {
      const country = formData.route.find(c => c.name.rus === rusName);
      return {
        name: { common: country ? country.name.common : '', rus: rusName },
        flags: { png: '', svg: '' },
        continent: [],
        island: false,
      };
    });
    setFormData((prevData) => ({ ...prevData, route: updatedCountries }));
  };

  const updateActivities = (newData: Partial<FormData['activities']>) => {
    setFormData((prevData) => ({
      ...prevData,
      activities: { ...prevData.activities, ...newData } as { [key: string]: string }
    }));
  };

  return (
    <section className={rootClassName}>
      <div className={styles.multiStepForm}>
        <h2 className={styles.multiStepFormTitle}>Добавить план:</h2>
        <div className={styles.multiStepFormWrapper}>
          {step === 1 && <StepOneDatesOfStay data={formData.stayDates} updateData={updateStayDates} nextStep={nextStep} />}
          {step === 2 && (
            <StepTwoItinerary
              data={{ countries: formData.route.map(country => country.name.rus) }}
              updateCountries={updateRoute}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {step === 3 && (
            <StepThreePastime
              data={formData.activities}
              selectedCountries={formData.route}
              updateData={updateActivities}
              prevStep={prevStep}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default MultiStepForm;