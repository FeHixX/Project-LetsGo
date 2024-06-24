import { FC } from 'react'
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
import { UserListProps } from './userList.types'

const userData = [
  {
    isNew: true,
    name: 'Таня Фирсова',
    photo: 'firsova.jpg',
    online: false,
    tags: '#ЗОЖ #ПП #Фитнес #пляж #авокадо #смузи',
    likes: 0,
    countries: [
      { name: 'Шри-Ланка', img: 'sri-lanka.png' },
      { name: 'Таиланд', img: 'thailand.png' },
      { name: 'Сейшелы', img: 'seychelles.png' }
    ],
    transport: [
      { icon: <IconPlane />, checked: true },
      { icon: <IconBus />, checked: false },
      { icon: <IconBicycle />, checked: false },
      { icon: <IconRun />, checked: false }
    ],
    level: 99
  },
  {
    name: 'Петя Демин',
    photo: 'demin.jpg',
    online: false,
    tags: '#бургер #бар #футбол #концерт #крафт',
    likes: 1500,
    countries: [
      { name: 'Бельгия', img: 'belgium.png' },
      { name: 'Чехия', img: 'czech.png' }
    ],
    transport: [
      { icon: <IconPlane />, checked: true },
      { icon: <IconBus />, checked: true },
      { icon: <IconBicycle />, checked: false },
      { icon: <IconRun />, checked: true }
    ],
    level: 80
  },
  {
    name: 'Марк Смолов',
    photo: 'smolov.jpg',
    online: false,
    tags: '#рэп #тату #хайпбист #кроссовки #суприм',
    likes: 170,
    countries: [
      { name: 'США', img: 'usa.png' },
      { name: 'Австралия', img: 'australia.png' },
      { name: 'Доминика', img: 'dominica.png' }
    ],
    transport: [
      { icon: <IconPlane />, checked: true },
      { icon: <IconBus />, checked: false },
      { icon: <IconBicycle />, checked: true },
      { icon: <IconRun />, checked: false }
    ],
    level: 25
  },
  {
    name: 'Лариса Роговая',
    photo: 'rogovaya.jpg',
    online: true,
    tags: '#образование #карьера #учеба #линкедин',
    likes: 23,
    countries: [
      { name: 'Великобритания', img: 'united-kingdom.png' },
      { name: 'Германия', img: 'germany.png' }
    ],
    transport: [
      { icon: <IconPlane />, checked: true },
      { icon: <IconBus />, checked: true },
      { icon: <IconBicycle />, checked: false },
      { icon: <IconRun />, checked: false }
    ],
    level: 50
  }
]

const UserList: FC<UserListProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

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
