import { FC } from 'react'
import { Button } from '@/ui'
import classNames from 'classnames'

import Like from '../like'
import styles from './groupButton.module.scss'
import { GroupButtonProps } from './groupButton.types'

const GroupButton: FC<GroupButtonProps> = ({ className, likeCounter }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <Button className={styles.button} size="sm">
        Позвать!
      </Button>
      <Like className={styles.like} initialCounter={likeCounter} />
    </div>
  )
}

export default GroupButton
