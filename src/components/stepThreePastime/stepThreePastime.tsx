// StepThreePastime.tsx

import React, { FC, useState, useCallback } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import classNames from 'classnames';
import styles from './stepThreePastime.module.scss';
import StepList from '../formNavigation/formNavigation';

export interface StepThreePastimeProps {
  className?: string;
  data: { Bosnia: string; Czechia: string };
  updateData: (data: Partial<{ Bosnia: string; Czechia: string }>) => void;
  prevStep: () => void;
}

interface Country {
  name: string;
  description: string;
}

interface FormData {
  companionCount: number;
  children: boolean;
  startDate: string;
  endDate: string;
  countryList: Country[];
  hashTags: string[];
  transport: string[];
}

const initialFormData: FormData = {
  companionCount: 0,
  children: false,
  startDate: '',
  endDate: '',
  countryList: [{ name: '', description: '' }],
  hashTags: [''],
  transport: ['']
};


const StepThreePastime: FC<StepThreePastimeProps> = ({ className, prevStep }) => {
  const rootClassName = classNames(styles.root, className);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleArrayChange = (
      e: ChangeEvent<HTMLInputElement>,
      field: 'countryList' | 'hashTags' | 'transport',
      index: number,
      subfield: 'name' | 'description' | null = null
  ) => {
      const value = e.target.value;
      const updatedArray = [...formData[field]];
      if (field === 'countryList' && subfield) {
          updatedArray[index] = {
              ...updatedArray[index],
              [subfield]: value
          };
      } else {
          updatedArray[index] = value;
      }
      setFormData({ ...formData, [field]: updatedArray });
  };

  const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
      field: keyof FormData
  ) => {
      const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
      setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      const response = await fetch('https://lets-go-8s43.onrender.com/cards/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);
  };

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
             <form onSubmit={handleSubmit}>
            <label>
                Companion Count:
                <input
                    type="number"
                    value={formData.companionCount}
                    onChange={(e) => handleChange(e, 'companionCount')}
                />
            </label>
            <br />
            <label>
                Children:
                <input
                    type="checkbox"
                    checked={formData.children}
                    onChange={(e) => handleChange(e, 'children')}
                />
            </label>
            <br />
            <label>
                Start Date:
                <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleChange(e, 'startDate')}
                />
            </label>
            <br />
            <label>
                End Date:
                <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleChange(e, 'endDate')}
                />
            </label>
            <br />
            <label>
                Country List:
                {formData.countryList.map((country, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={country.name}
                            onChange={(e) => handleArrayChange(e, 'countryList', index, 'name')}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={country.description}
                            onChange={(e) => handleArrayChange(e, 'countryList', index, 'description')}
                        />
                    </div>
                ))}
            </label>
            <br />
            <label>
                Hash Tags:
                {formData.hashTags.map((tag, index) => (
                    <input
                        key={index}
                        type="text"
                        value={tag}
                        onChange={(e) => handleArrayChange(e, 'hashTags', index)}
                    />
                ))}
            </label>
            <br />
            <label>
                Transport:
                {formData.transport.map((mode, index) => (
                    <input
                        key={index}
                        type="text"
                        value={mode}
                        onChange={(e) => handleArrayChange(e, 'transport', index)}
                    />
                ))}
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    </div>
  );
};

export default StepThreePastime;
