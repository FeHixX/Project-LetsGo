'use client'

import React, { FC, useEffect, useState } from 'react'
import useResponsive from '@/shared/hooks/useResponsive'
import IconFilter from '@icons/icon-filter.svg'
import axios from 'axios'

import styles from './countriesFilter.module.scss'

const continents = ['Европа', 'Азия', 'Америка', 'Острова']

interface Country {
  name: { common: string; rus: string }
  flags: {
    png: string
    svg: string
  }
  continent: string[]
  island: boolean
}

const CountriesFilter: FC<{ onFilterChange: (continent: string | null, country: string | null) => void }> = ({ onFilterChange }) => {
  const [countries, setCountries] = useState<Country[]>([])
  const [lettersAndCountries, setLettersAndCountries] = useState<{ [key: string]: Country[] }>({})
  const [selectedLetter, setSelectedLetter] = useState<string>('А')
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  const handleContinentClick = (continent: string) => {
    setSelectedContinent(continent === selectedContinent ? null : continent)
    setSelectedCountry(null)
    onFilterChange(continent === selectedContinent ? null : continent, null)
  }

  const handleCountryClick = (country: string) => {
    const newSelectedCountry = country === selectedCountry ? null : country;
    setSelectedCountry(newSelectedCountry);
    onFilterChange(selectedContinent, newSelectedCountry);
  }

  const { isMobile, isTablet, isDesktop } = useResponsive()
  const [active, setActive] = useState<boolean>(false)

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get('https://lets-go-8s43.onrender.com/countries/')
      if (response.data && typeof response.data === 'object') {
        const data = response.data as { [key: string]: Country[] }
        setLettersAndCountries(data)
        const flattenedCountries = Object.values(data).flat() as Country[]
        setCountries(flattenedCountries)
      }
    }

    fetchCountries()
  }, [])

  const letters = [
    'А', 'Б', 'В', 'Г', 'Д', 'Е', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О',
    'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ч', 'Ш', 'Э', 'Ю', 'Я'
  ]

  const filteredCountries = countries.filter((country) =>
    country.name.rus.startsWith(selectedLetter) &&
    (selectedContinent === null || country.continent.includes(selectedContinent))
  )

  return (
    <div className={styles.root}>
      <div className={active ? `${styles.filter} ${styles.activefilter}` : styles.filter}>
        <div className={styles.filterList}>
          <IconFilter />
          <span className={active ? `${styles.filterListTitle} ${styles.activeFilterListTitle}` : styles.filterListTitle}>
            Фильтрация по странам:
          </span>
          <ul className={active ? `${styles.continents} ${styles.activecontinents}` : styles.continents}>
            {continents.map((continent) => (
              <li
                tabIndex={0}
                key={continent}
                className={`${styles.continent} ${selectedContinent === continent ? styles.selectedContinent : ''}`}
                onClick={() => handleContinentClick(continent)}
              >
                {continent}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => setActive(!active)}
          className={active ? `${styles.filterCloseButton} ${styles.filterButton}` : `${styles.filterOpenButton} ${styles.filterButton}`}
        >
          <span className={`${styles.filterButtonText} ${styles.filterOpenButtonText}`}>
            Показать все
          </span>
          <span className={`${styles.filterButtonText} ${styles.filterCloseButtonText}`}>
            Свернуть
          </span>
        </button>
      </div>
      <div className={active ? styles.activecontainer : styles.container}>
        {isDesktop && (
          <div className={styles.wrapper}>
            {Object.entries(lettersAndCountries).map(([letter, countriesList]) => (
              <div className={styles.countries} key={letter}>
                <h4 className={styles.letter}>{letter}</h4>
                <ul className={styles.list}>
                  {countriesList.map((country) => (
                    <li
                      tabIndex={0}
                      className={`${styles.country} ${selectedCountry === country.name.rus ? styles.selectedCountry : ''}`}
                      key={country.name.common}
                      onClick={() => handleCountryClick(country.name.rus)}
                    >
                      <span className={styles.countryText}>{country.name.rus}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {(isTablet || isMobile) && (
          <div className={styles.wrapper}>
            <div className={styles.letters}>
              {letters.map((letter) => (
                <button
                  className={styles.letter}
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                >
                  {letter}
                </button>
              ))}
            </div>
            <ul className={styles.list}>
              {filteredCountries.map((country) => (
                <li
                key={country.name.common}
                className={`${styles.country} ${selectedCountry === country.name.rus ? styles.selectedCountry : ''}`}
                onClick={() => handleCountryClick(country.name.rus)}
              >
                <span className={styles.countryText}>{country.name.rus}</span>
              </li>
              ))}
            </ul>
          </div>
        )}
        <button
          onClick={() => setActive(!active)}
          className={styles.bigCloseButton}
        >
          <span className={styles.bigCloseButtonText}>Свернуть</span>
        </button>
      </div>
    </div>
  )
}

export default CountriesFilter