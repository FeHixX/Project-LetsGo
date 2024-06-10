import { FC } from 'react'
import { Heading, Wrapper } from '@/ui'
import classNames from 'classnames'

import styles from './sectionHeader.module.scss'
import { SectionHeaderProps } from './sectionHeader.types'

const SectionHeader: FC<SectionHeaderProps> = ({ children, className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <header className={rootClassName}>
      <Wrapper className={styles.wrapper}>
        <Heading tagName="h1" size='lg' className={styles.title}>
          {children}
        </Heading>
      </Wrapper>
    </header>
  )
}

export default SectionHeader
