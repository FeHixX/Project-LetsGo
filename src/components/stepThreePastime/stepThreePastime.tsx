import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import PolygonPrev from '@icons/polygon-prev.svg';
import classNames from 'classnames';
import Image from 'next/image';

import StepList from '../formNavigation/formNavigation';
import styles from './stepThreePastime.module.scss';

export interface StepThreePastimeProps {
  className?: string;
  data: { [key: string]: string };
  updateData: (data: Partial<{ Bosnia: string; Czechia: string }>) => void;
  prevStep: () => void;
  selectedCountries: Country[];
}

interface Country {
  name: { common: string; rus: string };
  flags: {
    png: string;
    svg: string;
  };
  description?: string;
}

interface FormData {
  companionCount: number;
  children: boolean;
  startDate: string;
  endDate: string;
  countryList: { name: string; description: string }[];
  hashTags: string[];
  transport: string[];
}

const initialFormData: FormData = {
  companionCount: 0,
  children: false,
  startDate: '',
  endDate: '',
  countryList: [],
  hashTags: [''],
  transport: ['']
};

const StepThreePastime: FC<StepThreePastimeProps> = ({
  className,
  prevStep,
  selectedCountries
}) => {
  const rootClassName = classNames(styles.root, className);
  const [formData, setFormData] = useState<FormData>({
    ...initialFormData,
    countryList: selectedCountries.map((country) => ({
      name: country.name.rus,
      description: country.description || ''
    }))
  });

  const handleArrayChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: 'countryList' | 'hashTags' | 'transport',
    index: number,
    subfield: 'name' | 'description' | null = null
  ) => {
    const value = e.target.value;
    const updatedArray = [...formData[field]];
    if (field === 'countryList' && subfield) {
      const updatedCountry = {
        ...(updatedArray[index] as { name: string; description: string }),
        [subfield]: value
      };
      updatedArray[index] = updatedCountry;
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

  const handleAddField = (field: 'hashTags' | 'transport') => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const handleRemoveField = (field: 'hashTags' | 'transport', index: number) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate that country names are in Russian and match the predefined list
    const invalidCountries = formData.countryList.filter((country) => {
      return !selectedCountries.some((sc) => sc.name.rus === country.name);
    });

    if (invalidCountries.length > 0) {
      alert('Наименование страны должно быть на русском языке из списка предложенных.');
      return;
    }

    const response = await fetch('https://lets-go-8s43.onrender.com/cards/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const data = await response.json();
      console.error(data);
      alert('Ошибка при отправке данных');
    } else {
      const data = await response.json();
      console.log(data);
    }
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
            <p>
              Наконец, расскажите о своих планах времяпровождения.
              <br />
              Можно писать в свободной форме и ставить тэги.
            </p>
          </div>
          <StepList currentStep={2} activeStep={2} setStep={() => {}} />
        </div>
        <button
          className={`${styles.formButton} ${styles.formButtonPrev}`}
          onClick={handlePrev}
        >
          <PolygonPrev />
          На шаг назад
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <br />
        <label>
          Country List:
          {formData.countryList.map((country, index) => (
            <div key={country.name}>
              <div className={styles.countryInfo}>
                <Image
                  src={selectedCountries[index].flags.png}
                  alt={`${country.name} flag`}
                  width={70}
                  height={47}
                />
                <div className={styles.countryName}>
                  {country.name}
                </div>
              </div>
              <input
                type="text"
                placeholder="Description"
                value={country.description}
                onChange={(e) =>
                  handleArrayChange(e, 'countryList', index, 'description')
                }
              />
            </div>
          ))}
        </label>
        <br />
        <label>
          Hash Tags:
          {formData.hashTags.map((tag, index) => (
            <div key={index}>
              <input
                type="text"
                value={tag}
                onChange={(e) => handleArrayChange(e, 'hashTags', index)}
              />
              <button type="button" onClick={() => handleRemoveField('hashTags', index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddField('hashTags')}>Add Tag</button>
        </label>
        <br />
        <label>
          Transport:
          {formData.transport.map((mode, index) => (
            <div key={index}>
              <input
                type="text"
                value={mode}
                onChange={(e) => handleArrayChange(e, 'transport', index)}
              />
              <button type="button" onClick={() => handleRemoveField('transport', index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddField('transport')}>Add Transport</button>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StepThreePastime;
