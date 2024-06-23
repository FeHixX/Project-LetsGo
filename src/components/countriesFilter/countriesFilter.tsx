'use client'

import React, { FC, useState } from 'react'
import useResponsive from '@/shared/hooks/useResponsive'

import styles from './countriesFilter.module.scss'

const continents = ['Европа', 'Азия', 'Америка', 'Острова']

const countries = [
  {
    letter: 'А',
    countries: [
      'Австралия',
      'Австрия',
      'Азербайджан',
      'Албания',
      'Алжир',
      'Ангола',
      'Андорра',
      'Антигуа и Барбуда',
      'Аргентина',
      'Армения',
      'Афганистан'
    ]
  },
  {
    letter: 'Б',
    countries: [
      'Багамские Острова',
      'Бангладеш',
      'Барбадос',
      'Бахрейн',
      'Белоруссия',
      'Белиз',
      'Бельгия',
      'Бенин',
      'Болгария',
      'Боливия',
      'Босния и Герцеговина',
      'Ботсвана',
      'Бразилия',
      'Бруней',
      'Буркина-Фасо',
      'Бурунди',
      'Бутан'
    ]
  },
  {
    letter: 'В',
    countries: [
      'Вануату',
      'Великобритания',
      'Венгрия',
      'Венесуэла',
      'Восточный Тимор',
      'Вьетнам'
    ]
  },
  {
    letter: 'Г',
    countries: [
      'Габон',
      'Гаити',
      'Гайана',
      'Гамбия',
      'Гана',
      'Гватемала',
      'Гвинея',
      'Гвинея-Бисау',
      'Германия',
      'Гондурас',
      'Гренада',
      'Греция',
      'Грузия'
    ]
  },
  {
    letter: 'Д',
    countries: ['Дания', 'Джибути', 'Доминика', 'Доминикана']
  },
  {
    letter: 'Е',
    countries: ['Египет']
  },
  {
    letter: 'З',
    countries: ['Замбия', 'Зимбабве']
  },
  {
    letter: 'И',
    countries: [
      'Израиль',
      'Индия',
      'Индонезия',
      'Иордания',
      'Ирак',
      'Иран',
      'Ирландия',
      'Исландия',
      'Испания',
      'Италия'
    ]
  },
  {
    letter: 'К',
    countries: [
      'Кабо-Верде',
      'Казахстан',
      'Камбоджа',
      'Камерун',
      'Канада',
      'Катар',
      'Кения',
      'Кипр',
      'Киргизия',
      'Кирибати',
      'Китай',
      'Колумбия'
    ]
  },
  {
    letter: 'Л',
    countries: [
      'Лаос',
      'Латвия',
      'Лесото',
      'Либерия',
      'Ливан',
      'Ливия',
      'Литва',
      'Лихтенштейн',
      'Люксембург'
    ]
  },
  {
    letter: 'М',
    countries: [
      'Маврикий',
      'Мавритания',
      'Мадагаскар',
      'Малави',
      'Малайзия',
      'Мали',
      'Мальдивы',
      'Мальта',
      'Марокко'
    ]
  },
  {
    letter: 'Н',
    countries: [
      'Намибия',
      'Науру',
      'Непал',
      'Нигер',
      'Нигерия',
      'Нидерланды',
      'Никарагуа',
      'Новая Зеландия',
      'Норвегия'
    ]
  },
  {
    letter: 'О',
    countries: ['ОАЭ', 'Оман']
  },
  {
    letter: 'П',
    countries: [
      'Пакистан',
      'Палау',
      'Панама',
      'Папуа - Новая Гвинея',
      'Парагвай',
      'Перу',
      'Польша',
      'Португалия'
    ]
  },
  {
    letter: 'Р',
    countries: ['Руанда', 'Румыния', 'Россия']
  },
  {
    letter: 'С',
    countries: [
      'Сальвадор',
      'Самоа',
      'Сан-Марино',
      'Саудовская Аравия',
      'Сейшелы',
      'Сенегал',
      'Сербия',
      'Сингапур',
      'Сирия',
      'Словакия',
      'Словения',
      'США'
    ]
  },
  {
    letter: 'Т',
    countries: [
      'Таджикистан',
      'Таиланд',
      'Танзания',
      'Того',
      'Тонга',
      'Тринидад и Тобаго',
      'Тувалу',
      'Тунис',
      'Туркмения',
      'Турция'
    ]
  },
  {
    letter: 'У',
    countries: ['Уганда', 'Узбекистан', 'Украина', 'Уругвай']
  },
  {
    letter: 'Ф',
    countries: ['Фиджи', 'Филиппины', 'Финляндия', 'Франция']
  },
  {
    letter: 'Х',
    countries: ['Хорватия']
  },
  {
    letter: 'Ч',
    countries: ['Чад', 'Черногория', 'Чехия', 'Чили']
  },
  {
    letter: 'Ш',
    countries: ['Швейцария', 'Швеция', 'Шри-Ланка']
  },
  {
    letter: 'Э',
    countries: ['Эквадор', 'Эритрея', 'Эсватини', 'Эстония', 'Эфиопия']
  },
  {
    letter: 'Ю',
    countries: ['ЮАР', 'Южный Судан']
  },
  {
    letter: 'Я',
    countries: ['Ямайка', 'Япония']
  }
]

let countriesAll: string[] = []
countries.map((item) => {
  for (let i = 0; i < item.countries.length; i++) {
    const element = item.countries[i]
    countriesAll.push(element)
  }
})

const CountriesFilter: FC = () => {
  const [selectedContinent, setSelectedContinent] = useState('ЕВРОПА')
  const [selectedLetter, setSelectedLetter] = useState('А')
  const { isMobile, isTablet, isDesktop } = useResponsive()
  const [active, setActive] = useState<boolean>(false)

  const filteredCountries: string[] = countriesAll.filter((country) =>
    country.startsWith(selectedLetter)
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
            {countries.map((item) => (
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
            ))}
          </div>
        )}
        {(isTablet || isMobile) && (
          <div className={styles.wrapper}>
            <div className={styles.letters}>
              {countries.map((item) => (
                <button
                  className={styles.letter}
                  key={item.letter}
                  onClick={() => setSelectedLetter(item.letter)}
                >
                  {item.letter}
                </button>
              ))}
            </div>
            <ul className={styles.list}>
              {filteredCountries.map((country) => (
                <li className={styles.country} key={country}>
                  <span className={styles.countryText}>{country}</span>
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
