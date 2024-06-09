import { FC } from 'react'
import { Wrapper } from '@/ui'
import IconTelegram from '@icons/telegram.svg'
import IconVKontakte from '@icons/vkontakte.svg'
import IconYoutube from '@icons/youtube.svg'

import styles from './footer.module.scss'
import { FooterSocialItemI } from './footer.types'
import Logo from './logo'
import Social from './social'

const socialList: FooterSocialItemI[] = [
  {
    label: 'telegram',
    href: '#',
    icon: <IconTelegram />
  },
  {
    label: 'vkontakte',
    href: '#',
    icon: <IconVKontakte />
  },
  {
    label: 'youtube',
    href: '#',
    icon: <IconYoutube />
  }
]

const Footer: FC = () => {
  return (
    <footer className={styles.root}>
      <Wrapper className={styles.wrapper}>
        <Logo className={styles.logo} />
        <Social items={socialList} className={styles.social} />
      </Wrapper>
    </footer>
  )
}

export default Footer
