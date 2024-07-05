import { FC, useEffect, useState } from 'react'
import { Pagination } from '@/modules/pagination'
import { Wrapper } from '@/ui'
import IconBicycle from '@icons/icon-bicycle.svg'
import IconBus from '@icons/icon-bus.svg'
import IconPlane from '@icons/icon-plane.svg'
import IconPlus from '@icons/icon-plus.svg'
import IconRun from '@icons/icon-run.svg'
import classNames from 'classnames'

import { Filters } from '../filters'
import { UserCard } from '../userCard'
import styles from './userList.module.scss'
import { UserListProps, TransformedUserData } from './userList.types'

const UserList: FC<UserListProps> = ({ className, cardData }) => {
  const rootClassName = classNames(styles.root, className)
  const [userData, setUserData] = useState<TransformedUserData[]>([])
  const [visibleCards, setVisibleCards] = useState(4)
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 4

  useEffect(() => {
    if (cardData && cardData.cardList) {
      const transformedData = cardData.cardList.map(card => ({
        name: card.name,
        photo: card.avatarUrl,
        online: false,
        tags: card.hashTags.join(' '),
        likes: 0,
        countries: card.countryList.map(country => ({
          name: country.countryData.name.rus,
          img: country.countryData.flags.png
        })),
        transport: [
          { icon: <IconPlane />, label: 'Авиаперелет', checked: card.transport.includes('plane') },
          { icon: <IconBus />, label: 'Автотранспорт', checked: card.transport.includes('bus') },
          { icon: <IconBicycle />, label: 'Велосипед', checked: card.transport.includes('bike') },
          { icon: <IconRun />, label: 'Пешком', checked: card.transport.includes('walk') }
        ],
        level: 0
      }))
      setUserData(transformedData)
    }
  }, [cardData])

  const handleShowMore = () => {
    setVisibleCards(prevVisible => prevVisible + 4)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = userData.slice(indexOfFirstCard, indexOfLastCard)

  return (
    <section className={rootClassName}>
      <h2 className="visually-hidden">Список попутчиков</h2>
      <Wrapper className={styles.wrapper}>
        <Filters className={styles.filters} />
        <ul className={styles.list}>
          {currentCards.map((item, index) => (
            <li key={index}>
              <UserCard item={item} />
            </li>
          ))}
        </ul>
        {visibleCards < userData.length && (
          <button className={styles.button} type="button" onClick={handleShowMore}>
            <IconPlus />
            Показать еще
          </button>
        )}
        <Pagination 
          className={styles.pagination} 
          currentPage={currentPage}
          totalPages={Math.ceil(userData.length / cardsPerPage)}
          onPageChange={handlePageChange}
        />
      </Wrapper>
    </section>
  )
}

export default UserList