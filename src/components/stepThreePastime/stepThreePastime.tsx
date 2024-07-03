import React, { ChangeEvent, FC, FormEvent, useState, useEffect } from 'react';
import PolygonPrev from '@icons/polygon-prev.svg';
import PolygonNext from '@icons/polygon-next.svg';
import classNames from 'classnames';
import Image from 'next/image';
import styles from './stepThreePastime.module.scss';
import StepList from '../formNavigation/formNavigation';
import { useRouter } from 'next/navigation';

export interface StepThreePastimeProps {
  className?: string;
  data: {
    companionCount: number;
    children: boolean;
    startDate: string;
    endDate: string;
    countryList: { name: string; description: string }[];
    hashTags: string[];
    transport: string[];
  };
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

const StepThreePastime: FC<StepThreePastimeProps> = ({
  className,
  prevStep,
  selectedCountries,
  updateData,
  data
}) => {
  const rootClassName = classNames(styles.root, className);
  const [formData, setFormData] = useState<FormData>(data);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      countryList: selectedCountries.map((country) => ({
        name: country.name.rus,
        description: country.description || ''
      }))
    }));
    validateForm();
  }, [selectedCountries]);

  const handleArrayChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: 'countryList',
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
    }
    setFormData({ ...formData, [field]: updatedArray });
    validateForm();
  };

  const router = useRouter();
  const validateForm = () => {
    const isValid = formData.countryList.every(country => country.description.trim() !== '');
    setIsFormValid(isValid);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validTransports = ['plane', 'bus', 'bike', 'walk'];
    const filteredTransport = formData.transport.filter(transport => validTransports.includes(transport));
    const updatedFormData = { ...formData, transport: filteredTransport };

    const invalidCountries = updatedFormData.countryList.filter((country) => {
      return !selectedCountries.some((sc) => sc.name.rus === country.name);
    });

    if (invalidCountries.length > 0) {
      alert('Наименование страны должно быть на русском языке из списка предложенных.');
      return;
    }

    const startDate = updatedFormData.startDate.split('T')[0];
    const endDate = updatedFormData.endDate.split('T')[0];

    const response = await fetch('https://lets-go-8s43.onrender.com/cards/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...updatedFormData, startDate, endDate })
    });

    if (!response.ok) {
      const data = await response.json();
      console.error(data);
      alert('Ошибка при отправке данных');
    } else {
      const data = await response.json();
      console.log(data);
      alert('Данные успешно отправлены!');
      updateData(data);

      if (data.id) {
        localStorage.setItem('cardId', data.id);
        console.log('Сохраненный ID карточки:', data.id);
        router.push('/companions');
      }
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
        <form onSubmit={handleSubmit}>
          <label>
            Country List:
            {formData.countryList.map((country, index) => (
              <div key={country.name}>
                <div className={styles.countryInfo}>
                  <Image
                    src={selectedCountries[index]?.flags.png}
                    alt={`${country.name} flag`}
                    width={70}
                    height={47}
                  />
                  <div className={styles.countryName}>{country.name}</div>
                </div>
                <input
                  type="text"
                  placeholder="Description"
                  value={country.description}
                  maxLength={200}
                  onChange={(e) =>
                    handleArrayChange(e, 'countryList', index, 'description')
                  }
                />
              </div>
            ))}
          </label>
          <button type="submit" className={styles.submitButton} disabled={!isFormValid}>
            Отправить
            <PolygonNext />
          </button>
        </form>
        <button
          className={`${styles.formButton} ${styles.formButtonPrev}`}
          onClick={handlePrev}
        >
          <PolygonPrev />
          На шаг назад
        </button>
      </div>
    </div>
  );
};

export default StepThreePastime;
