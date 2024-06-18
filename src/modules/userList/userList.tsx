import { FC } from 'react'
import { Pagination } from '@/modules/pagination'
import { Wrapper } from '@/ui'
import IconPlus from '@icons/icon-plus.svg'
import classNames from 'classnames'

import { UserCard } from '../userCard'
import styles from './userList.module.scss'
import { UserListProps } from './userList.types'

// const userData = []

const UserList: FC<UserListProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <section className={rootClassName}>
      <h2 className="visually-hidden">Список попутчиков</h2>
      <Wrapper className={styles.wrapper}>
        <ul className={styles.list}>
          <li>
            <UserCard />
          </li>
          {/* {userData.map((item, index) => (
            <li key={index}>
              <userCard data={item} />
            </li>
          ))} */}
        </ul>
        <button className={styles.button} type="button">
          <IconPlus />
          Показать еще
        </button>
        <Pagination className={styles.pagination} />
      </Wrapper>
    </section>
  )
}

export default UserList
