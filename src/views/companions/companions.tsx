'use client'

import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageHeader } from '@/modules/pageHeader'
import { UserList } from '@/modules/userList'
import classNames from 'classnames'
import { CountriesFilter } from '@/components/countriesFilter'
import styles from './companions.module.scss'
import { CompanionsProps } from './companions.types'
import axios from 'axios'

interface CardData {
  cardList: {
    name: string
    avatarUrl: string
    hashTags: string[]
    countryList: {
      countryData: {
        name: { rus: string }
        flags: { png: string }
      }
    }[]
    transport: string[]
  }[]
}

const Companions: FC<CompanionsProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)
  const [cardData, setCardData] = useState<CardData | null>(null)
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const router = useRouter()

  const handleFilterChange = (continent: string | null, country: string | null) => {
    setSelectedContinent(continent)
    setSelectedCountry(country)
  }

  useEffect(() => {
    const cardId = localStorage.getItem('cardId')
    if (!cardId) {
      router.push('/') // Редирект на главную страницу, если нет cardId
    } else {
      const fetchCardData = async () => {
        try {
          const response = await axios.get<CardData>(`https://lets-go-8s43.onrender.com/cards/${cardId}`)
          setCardData(response.data)
        } catch (error) {
          console.error('Ошибка при получении данных карточки:', error)
          router.push('/') // Редирект на главную страницу в случае ошибки
        }
      }
      fetchCardData()
    }
  }, [router])

  if (!cardData) {
    return null 
  }

  return (
    <main className={rootClassName}>
      <PageHeader className={styles.header}>Попутчики</PageHeader>
      <CountriesFilter onFilterChange={handleFilterChange} />
      <UserList
        className={styles.list}
        initialCardData={cardData}
        selectedContinent={selectedContinent}
        selectedCountry={selectedCountry}
      />
    </main>
  )
}

export default Companions