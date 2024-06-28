'use client'

import React, { FC, useEffect, useState } from 'react'
import useResponsive from '@/shared/hooks/useResponsive'
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

const CountriesFilter: FC = () => {
  const [selectedContinent, setSelectedContinent] = useState('ЕВРОПА')
  const [countries, setCountries] = useState<Country[]>([])
  const [lettersAndCountries, setLetterAndCountries] = useState([])
  const [selectedLetter, setSelectedLetter] = useState<string>('А')
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([])

  const { isMobile, isTablet, isDesktop } = useResponsive()
  const [active, setActive] = useState<boolean>(false)

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get(
        'https://lets-go-8s43.onrender.com/countries/'
      )
      if (response.data && typeof response.data === 'object') {
        const flattenedCountries = Object.values(
          response.data
        ).flat() as Country[]
        const data = response.data
        const countries = Object.entries(data).map((data) => ({
          [data[0]]: data[1]
        }))
        setLetterAndCountries(countries)
        setCountries(flattenedCountries)
        console.log(countries)
      }
    }

    fetchCountries()
  }, [])

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
    <div className={styles.root}>
      <div
        className={
          active ? `${styles.filter} ${styles.activefilter}` : styles.filter
        }
      >
        <div className={styles.filterList}>
          <span
            className={
              active
                ? `${styles.filterListTitle} ${styles.activeFilterListTitle}`
                : styles.filterListTitle
            }
          >
            Фильтрация по странам:
          </span>
          <ul
            className={
              active
                ? `${styles.continents} ${styles.activecontinents}`
                : styles.continents
            }
          >
            {continents.map((continent) => (
              <li
                key={continent}
                className={styles.continent}
                onClick={() => setSelectedContinent(continent)}
              >
                {continent}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => setActive(!active)}
          className={
            active
              ? `${styles.filterCloseButton} ${styles.filterButton}`
              : `${styles.filterOpenButton} ${styles.filterButton}`
          }
        >
          <span
            className={`${styles.filterButtonText} ${styles.filterOpenButtonText}`}
          >
            Показать все
          </span>
          <span
            className={`${styles.filterButtonText} ${styles.filterCloseButtonText}`}
          >
            Свернуть
          </span>
        </button>
      </div>
      <div className={active ? styles.activecontainer : styles.container}>
        {isDesktop && (
          <div className={styles.wrapper}>
            {/* {countries.map((item) => (
              <div className={styles.countries} key={item.letter}>
                <h4 className={styles.letter}>{item.letter}</h4>
                <ul className={styles.list}>
                  {item.countries.map((country) => (
                    <li className={styles.country} key={country}>
                      <span className={styles.countryText}>{country}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))} */}
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
                <li key={country.name.common}>
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
          <span className={styles.bigCloseButtonText}>Свенуть</span>
        </button>
      </div>
    </div>
  )
}

export default CountriesFilter
