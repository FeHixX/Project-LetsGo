import { FC } from 'react'
import { Accordion, Wrapper } from '@/ui'
import classNames from 'classnames'

import styles from './home.module.scss'
import { HomeProps } from './home.types'

const Home: FC<HomeProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  const accordionItems = [
    {
      title: 'Первый',
      content: 'Тест 1'
    },
    {
      title: 'Второй',
      content: 'Тест 2'
    },
    {
      title: 'Третий',
      content: 'Тест 3'
    }
  ]

  return (
    <main className={rootClassName}>
      <Wrapper>
        <Accordion items={accordionItems} />
      </Wrapper>
    </main>
  )
}

export default Home
