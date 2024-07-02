'use client'

import { FC, useEffect, useState } from 'react'
import { PageHeader } from '@/modules/pageHeader'
import { UserList } from '@/modules/userList'
import classNames from 'classnames'
import { CountriesFilter } from '@/components/countriesFilter'
import styles from './companions.module.scss'
import { CompanionsProps } from './companions.types'
import axios from 'axios'

const Companions: FC<CompanionsProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)
  const [cardData, setCardData] = useState(null)

  useEffect(() => {
    const fetchCardData = async () => {
      const cardId = localStorage.getItem('cardId')
      if (cardId) {
        try {
          const response = await axios.get(`https://lets-go-8s43.onrender.com/cards/${cardId}`)
          setCardData(response.data)
        } catch (error) {
          console.error('Error fetching card data:', error)
        }
      }
    }

    fetchCardData()
  }, [])

  return (
    <main className={rootClassName}>
      <PageHeader className={styles.header}>Попутчики</PageHeader>
      <CountriesFilter />
      <UserList className={styles.list} cardData={cardData} />
    </main>
  )
}

export default Companions