import React, { ChangeEvent, FC, useState } from 'react';
import { User } from '@/modules/user';
import { Wrapper } from '@/ui';
import classNames from 'classnames';

import StepOneDatesOfStay from '../stepOneDatesOfStay/stepOneDatesOfStay';
import StepThreePastime from '../stepThreePastime/stepThreePastime';
import StepTwoItinerary from '../stepTwoItinerary/stepTwoItinerary';
import styles from './multiStepForm.module.scss';
import StepList from '../formNavigation/formNavigation';

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
    children: boolean;
  };
  route: Country[];
  activities: {
    [key: string]: string;
  };
  hashTags: string[];
  transport: string[];
}

const MultiStepForm: FC<{ className?: string }> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    stayDates: { numPeople: 0, duration: 0, dates: ['', ''], children: false },
    route: [],
    activities: {},
    hashTags: [],
    transport: [],
  });

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const updateStayDates = (newData: Partial<FormData['stayDates']>) => {
    setFormData((prevData) => ({
      ...prevData,
      stayDates: { ...prevData.stayDates, ...newData },
    }));
  };

  const updateRoute = (newRoute: { countries: Country[] }) => {
    setFormData((prevData) => ({ ...prevData, route: newRoute.countries }));
  };

  const updateActivities = (newData: Partial<FormData['activities']>) => {
    setFormData((prevData) => ({
      ...prevData,
      activities: {
        ...prevData.activities,
        ...newData,
      } as FormData['activities'],
    }));
  };

  const updateHashTags = (e: ChangeEvent<HTMLInputElement>) => {
    const newHashTags = e.target.value.split(',').map((tag) => tag.trim());
    setFormData((prevData) => ({
      ...prevData,
      hashTags: newHashTags,
    }));
  };

  const updateTransport = (e: ChangeEvent<HTMLInputElement>) => {
    const newTransport = e.target.value.split(',').map((transport) => transport.trim());
    setFormData((prevData) => ({
      ...prevData,
      transport: newTransport,
    }));
  };

  return (
    <section className={rootClassName}>
      <User
        className={styles.user}
        valueHashtags={formData.hashTags.join(', ')}
        onChangeHashtags={updateHashTags}
        valueTransport={formData.transport.join(', ')}
        onChangeTransport={updateTransport}
      />
      <div className={styles.form}>
        <Wrapper>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>Добавить план:</h2>
            <StepList
              className={styles.stepList}
              currentStep={step - 1}
              activeStep={step - 1}
              setStep={(newStep) => setStep(newStep + 1)}
              showStepNames={false}
            />
          </div>
          <div className={styles.wrapper}>
            {step === 1 && (
              <StepOneDatesOfStay
                data={formData.stayDates}
                updateData={updateStayDates}
                nextStep={nextStep}
              />
            )}
            {step === 2 && (
              <StepTwoItinerary
                data={{
                  countries: formData.route.map((country) => country.name.rus),
                }}
                updateCountries={updateRoute}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            {step === 3 && (
              <StepThreePastime
                data={{
                  companionCount: formData.stayDates.numPeople,
                  children: formData.stayDates.children,
                  startDate: formData.stayDates.dates[0],
                  endDate: formData.stayDates.dates[1],
                  countryList: formData.route.map((country) => ({
                    name: country.name.rus,
                    description: country.description || '',
                  })),
                  hashTags: formData.hashTags,
                  transport: formData.transport,
                }}
                selectedCountries={formData.route}
                updateData={updateActivities}
                prevStep={prevStep}
                updateHashTags={updateHashTags}
                updateTransport={updateTransport}
              />
            )}
          </div>
        </Wrapper>
      </div>
    </section>
  );
};

export default MultiStepForm;