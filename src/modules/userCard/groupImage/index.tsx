import { FC } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

import Like from '../like'
import styles from './groupImage.module.scss'
import { GroupImageProps } from './groupImage.types'

const GroupImage: FC<GroupImageProps> = ({
  className,
  userPhoto,
  likeCounter
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <Image
        src={`${process.env.NODE_ENV === 'production' ? '/intern-pognali-1-6' : ''}/images/${userPhoto}`}
        width={285}
        height={285}
        quality={85}
        alt="Аватарка"
      />
      <Like className={styles.like} initialCounter={likeCounter} />
    </div>
  )
}

export default GroupImage
