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

  useEffect(() => {
    if (cardData && cardData.cardList) {
      const transformedData = cardData.cardList.map(card => ({
        name: card.name,
        photo: card.avatarUrl, // Используем полный URL аватара
        online: false,
        tags: card.hashTags.join(' '),
        likes: 0,
        countries: card.countryList.map(country => ({
          name: country.countryData.name.rus,
          img: country.countryData.flags.png // Используем полный URL флага
        })),
        transport: [
          { icon: <IconPlane />, checked: card.transport.includes('plane') },
          { icon: <IconBus />, checked: card.transport.includes('bus') },
          { icon: <IconBicycle />, checked: card.transport.includes('bike') },
          { icon: <IconRun />, checked: card.transport.includes('walk') }
        ],
        level: 0
      }))
      setUserData(transformedData)
    }
  }, [cardData])

  return (
    <section className={rootClassName}>
      <h2 className="visually-hidden">Список попутчиков</h2>
      <Wrapper className={styles.wrapper}>
        <Filters className={styles.filters} />
        <ul className={styles.list}>
          {userData.map((item, index) => (
            <li key={index}>
              <UserCard item={item} />
            </li>
          ))}
        </ul>
        <button className={styles.button} type="button" data-button="show">
          <IconPlus />
          Показать еще
        </button>
        <Pagination className={styles.pagination} />
      </Wrapper>
    </section>
  )
}

export default UserList