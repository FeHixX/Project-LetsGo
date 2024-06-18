import { FC } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

import styles from './countries.module.scss'
import { CountriesProps } from './countries.types'

const Countries: FC<CountriesProps> = ({ item, className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <span>Хочет посетить:</span>
      <ul>
        {item.map(({ name, img }) => (
          <li className={styles.item} key={name}>
            <Image
              src={`${process.env.NODE_ENV === 'production' ? '/intern-pognali-1-6' : ''}/images/${img}`}
              width={35}
              height={24}
              quality={85}
              alt="Флаг страны: ${name}"
            />
            {name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Countries
