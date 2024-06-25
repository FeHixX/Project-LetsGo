import { FC, useState, useEffect } from 'react';
import classNames from 'classnames';
import Polygon from '@icons/polygon.svg';
import axios from 'axios';
import Image from 'next/image';

import styles from './stepTwoItinerary.module.scss';
import { StepTwoItineraryProps } from './stepTwoItinerary.types';
import StepList from '../formNavigation/formNavigation';

interface Country {
  name: { common: string; rus: string };
  flags: {
    png: string;
    svg: string;
  };
  continent: string[];
  island: boolean;
}

const StepTwoItinerary: FC<StepTwoItineraryProps> = ({ className, nextStep, prevStep }) => {
  const rootClassName = classNames(styles.root, className);

  const handleNext = () => {
    nextStep();
  };

  const handlePrev = () => {
    prevStep();
  };

  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string>('А');

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get('https://lets-go-8s43.onrender.com/countries/');
      if (response.data && typeof response.data === 'object') {
        const flattenedCountries = Object.values(response.data).flat() as Country[];
        setCountries(flattenedCountries);
      }
    };

    fetchCountries();
  }, []);

  const handleCountrySelect = (country: Country) => {
    if (country && selectedCountries.length < 4 && !selectedCountries.some(c => c.name.common === country.name.common)) {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  const handleCountryRemove = (country: Country) => {
    setSelectedCountries(selectedCountries.filter((c) => c.name.common !== country.name.common));
  };

  const letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ч', 'Ш', 'Э', 'Ю', 'Я'];
  const filteredCountries = countries.filter(country => country.name.rus.startsWith(selectedLetter));

  return (
    <div className={rootClassName}>
      <div>
        <div className={styles.formHead}>
          <div className={styles.formDescription}>
            <h2>Шаг 2. Маршрут</h2>
            <p>Укажите страны, которые вы хотели бы посетить. <br />
              Это может быть одна или сразу несколько.</p>
          </div>
          <StepList currentStep={1} activeStep={1} setStep={nextStep} />
        </div>
        <button onClick={handlePrev}>На шаг назад</button>
        <button className={styles.formButton} onClick={handleNext}>Следующий шаг
          <Polygon />
        </button>
      </div>
      <div>
        <select onChange={(e) => {
          const value = e.target.value;
          if (letters.includes(value)) {
            setSelectedLetter(value);
          } else {
            const selectedCountry = countries.find(c => c.name.common === value);
            if (selectedCountry) {
              handleCountrySelect(selectedCountry);
            }
          }
        }}>
          <option value="">Выберите страну</option>
          {letters.map(letter => (
            <option key={letter} value={letter} style={{ fontWeight: 'bold' }}>
              {letter}
            </option>
          ))}
          {filteredCountries.map((country) => (
            <option key={country.name.common} value={country.name.common}>
              {country.name.rus} ({country.name.common})
            </option>
          ))}
        </select>
        <div>
          <h3>Страны (Max 4):</h3>
          <ul>
            {selectedCountries.map((country) => (
              <li key={country.name.common}>
                <Image 
                  src={country.flags.png} 
                  alt={`${country.name.common} flag`} 
                  width={20} 
                  height={15} 
                />
                {country.name.rus} ({country.name.common})
                <button onClick={() => handleCountryRemove(country)}>Удалить</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StepTwoItinerary;
