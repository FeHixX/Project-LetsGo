import { FC } from 'react'
import classNames from 'classnames'

import Countries from './countries'
import GroupButton from './groupButton'
import GroupImage from './groupImage'
import GroupTransport from './groupTransport'
import styles from './userCard.module.scss'
import { UserCardProps } from './userCard.types'

const UserCard: FC<UserCardProps> = ({
  className,
  item: { cardId, isNew, name, photo, online, tags, likes, countries, transport, level }
}) => {
  const localCardId = localStorage.getItem('cardId');
  const isCurrentUser = cardId === localCardId;
  const rootClassName = classNames(
    styles.root,
    className,
    isNew ? styles.root_new : '',
    isCurrentUser ? styles.root_current : ''
  )

  return (
    <article className={rootClassName}>
      <h3 className={styles.title} data-online={online}>
        {name}
      </h3>
      
      <GroupImage
        className={styles.image}
        userPhoto={photo}
        likeCounter={isCurrentUser ? undefined : likes}
      />
      <div className={styles.tags}>
        <p>{tags}</p>
      </div>
      <Countries className={styles.countries} item={countries} />
      {!isCurrentUser && <GroupButton className={styles.button} likeCounter={likes} />}
      <GroupTransport
        className={styles.transport}
        items={transport}
        userLevel={level}
      />
    </article>
  )
}

export default UserCard
