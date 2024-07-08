import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import PolygonNext from '@icons/polygon-next.svg'
import PolygonPrev from '@icons/polygon-prev.svg'
import axios from 'axios'
import classNames from 'classnames'

import StepList from '../formNavigation/formNavigation'
import styles from './stepTwoItinerary.module.scss'
import { StepTwoItineraryProps } from './stepTwoItinerary.types'

interface Country {
  name: { common: string; rus: string }
  flags: {
    png: string
    svg: string
  }
  continent: string[]
  island: boolean
  description?: string
}

const StepTwoItinerary: FC<StepTwoItineraryProps> = ({
  className,
  nextStep,
  prevStep,
  updateCountries
}) => {
  const rootClassName = classNames(styles.root, className)

  const handleNext = () => {
    updateCountries({ countries: selectedCountries })
    nextStep()
  }

  const handlePrev = () => {
    prevStep()
  }

  const [countries, setCountries] = useState<Country[]>([])
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([])
  const [selectedLetter, setSelectedLetter] = useState<string>('А')
  const [activeSelect, setActiveSelect] = useState(false)

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get(
        'https://lets-go-8s43.onrender.com/countries/'
      )
      if (response.data && typeof response.data === 'object') {
        const flattenedCountries = Object.values(
          response.data
        ).flat() as Country[]
        setCountries(flattenedCountries)
      }
    }

    fetchCountries()
  }, [])

  const handleCountrySelect = (country: Country) => {
    if (
      country &&
      selectedCountries.length < 4 &&
      !selectedCountries.some((c) => c.name.rus === country.name.rus)
    ) {
      setSelectedCountries([...selectedCountries, country])
    }
  }

  const handleCountryRemove = (country: Country) => {
    setSelectedCountries(
      selectedCountries.filter((c) => c.name.rus !== country.name.rus)
    )
  }

  const letters = [
    'А',
    'Б',
    'В',
    'Г',
    'Д',
    'Е',
    'З',
    'И',
    'К',
    'Л',
    'М',
    'Н',
    'О',
    'П',
    'Р',
    'С',
    'Т',
    'У',
    'Ф',
    'Х',
    'Ч',
    'Ш',
    'Э',
    'Ю',
    'Я'
  ]
  const filteredCountries = countries.filter((country) =>
    country.name.rus.startsWith(selectedLetter)
  )

  return (
    <div className={rootClassName}>
      <div>
        <div className={styles.formHead}>
          <div className={styles.formDescription}>
            <h2>Шаг 2. Маршрут</h2>
            <p>
              Укажите&nbsp;страны,&nbsp;которые&nbsp;вы&nbsp;хотели бы посетить.
              Это может быть одна или сразу несколько.
            </p>
          </div>
          <StepList currentStep={1} activeStep={1} setStep={nextStep} />
        </div>
        <div className={styles.formContainer}>
          <ul className={styles.countries}>
            {selectedCountries.map((country) => (
              <li className={styles.country} key={country.name.rus}>
                <div className={styles.countryName}>
                  <span className={styles.countryNameText}>
                    {country.name.rus}
                  </span>
                  <div className={styles.countryArrow}>
                    <span className={styles.countryArrowButtom}></span>
                  </div>
                </div>
                <div className={styles.countryIndicator}>
                  <div className={styles.countryImage}>
                    <Image
                      className={styles.countryFlags}
                      src={country.flags.png}
                      alt={`${country.name.rus} flag`}
                      width={70}
                      height={47}
                    />
                  </div>
                  <button
                    className={styles.countryDelete}
                    onClick={() => handleCountryRemove(country)}
                  ></button>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.formSelectContainer}>
            <div className={styles.formSelect}>
              <button
                onClick={() => setActiveSelect(!activeSelect)}
                className={styles.formSelectButton}
              >
                <span className={styles.formSelectButtonText}>
                  Выберите страну
                </span>
                <span className={styles.formSelectArrowCross}></span>
              </button>
              <div
                className={
                  activeSelect
                    ? styles.activeLettersAndCountries
                    : styles.lettersAndCountries
                }
              >
                <ul className={styles.letters}>
                  {letters.map((letter) => (
                    <li
                      className={styles.letter}
                      key={letter}
                      onClick={() => setSelectedLetter(letter)}
                      style={{ fontWeight: 'bold' }}
                    >
                      {letter}
                    </li>
                  ))}
                </ul>
                <ul className={styles.countriesAlphabet}>
                  {filteredCountries.map((country) => (
                    <li
                      className={styles.countryAlphabet}
                      key={country.name.rus}
                      onClick={() => handleCountrySelect(country)}
                    >
                      {country.name.rus}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button className={styles.countryAlphabetDelete}></button>
          </div>
          <div className={styles.formButtons}>
            <button
              className={`${styles.formButton} ${styles.formButtonNext}`}
              onClick={handleNext}
            >
              Следующий шаг
              <PolygonNext />
            </button>
            <button
              className={`${styles.formButton} ${styles.formButtonPrev}`}
              onClick={handlePrev}
            >
              <PolygonPrev />
              На шаг назад
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StepTwoItinerary
