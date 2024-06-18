import { FC } from 'react'
import Image from 'next/image'
import { Button } from '@/ui'
import IconBicycle from '@icons/icon-bicycle.svg'
import IconBus from '@icons/icon-bus.svg'
import IconPlane from '@icons/icon-plane.svg'
import IconRun from '@icons/icon-run.svg'
import classNames from 'classnames'

import { Level } from '../level'
import Countries from './countries'
import Like from './like'
import Transport from './transport'
import styles from './userCard.module.scss'
import {
  userCardProps,
  UserCountriesItemI,
  UserTransportItemI
} from './userCard.types'

const CountriesList: UserCountriesItemI[] = [
  {
    name: 'Бельгия',
    img: 'belgium.png'
  },
  {
    name: 'Чехия',
    img: 'czech.png'
  }
]

const TransportList: UserTransportItemI[] = [
  {
    icon: <IconPlane />,
    checked: true
  },
  {
    icon: <IconBus />,
    checked: true
  },
  {
    icon: <IconBicycle />,
    checked: false
  },
  {
    icon: <IconRun />,
    checked: true
  }
]

const userName = 'Петя Демин'
const userOnline = false
const userPhoto = 'demin.jpg'
const userTags = '#бургер #бар #футбол #концерт #крафт'
const LikeCounter = 1500
const userLevel = 80

const userCard: FC<userCardProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <article className={rootClassName}>
      <h3 className={styles.title} data-online={userOnline}>
        {userName}
      </h3>
      <div className={styles.image}>
        <Image
          src={`${process.env.NODE_ENV === 'production' ? '/intern-pognali-1-6' : ''}/images/${userPhoto}`}
          width={285}
          height={285}
          quality={85}
          alt="Аватарка"
        />
      </div>
      <p className={styles.tags}>{userTags}</p>
      <Countries className={styles.countries} item={CountriesList} />
      <div className={styles.center}>
        <Button className={styles.button} size="sm">
          Позвать!
        </Button>
        <Like className={styles.like} initialCounter={LikeCounter} />
      </div>
      <div className={styles.right}>
        <Transport className={styles.transport} item={TransportList} />
        <Level className={styles.level} level={userLevel} />
      </div>
    </article>
  )
}

export default userCard
