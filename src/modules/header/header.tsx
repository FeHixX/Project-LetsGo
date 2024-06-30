'use client'

import { FC, useState } from 'react'
import { Wrapper } from '@/ui'
import MailIcon from '@icons/mail.svg'
import PhoneIcon from '@icons/phone.svg'
import TelegramIcon from '@icons/telegram.svg'
import VkIcon from '@icons/vkontakte.svg'
import YoutubeIcon from '@icons/youtube.svg'

import styles from './header.module.scss'
import {
  HeaderContactItemI,
  HeaderSiteItemI,
  HeaderSocialItemI
} from './header.types'
import Logo from './logo'
import Nav from './nav'

const siteList: HeaderSiteItemI[] = [
  {
    label: 'service',
    href: '#',
    description: 'О сервисе'
  },
  {
    label: 'directions',
    href: `${process.env.NODE_ENV === 'production' ? '/intern-pognali-1-6' : ''}/`,
    description: 'Направления'
  },
  {
    label: 'companion',
    href: `${process.env.NODE_ENV === 'production' ? '/intern-pognali-1-6' : ''}/companions`,
    description: 'Попутчики'
  }
]

const contactList: HeaderContactItemI[] = [
  {
    label: 'phone',
    href: 'tel:+88005558628',
    description: '8 800 555-86-28',
    icon: <PhoneIcon />
  },
  {
    label: 'mail',
    href: 'mailto:mail@htmlacademy.ru',
    description: 'mail@htmlacademy.ru',
    icon: <MailIcon />
  }
]

const socialList: HeaderSocialItemI[] = [
  {
    label: 'telegram',
    href: '#',
    icon: <TelegramIcon />
  },
  {
    label: 'vk',
    href: '#',
    icon: <VkIcon />
  },
  {
    label: 'youtube',
    href: '#',
    icon: <YoutubeIcon />
  }
]

const Header: FC = () => {
  const [active, setActive] = useState<boolean>(false)

  return (
    <header className={styles.root}>
      <button
        onClick={() => setActive(!active)}
        className={active ? styles.activetoggle : styles.toggle}
      ></button>
      <Wrapper
        className={
          active ? `${styles.wrapper} ${styles.activewrapper}` : styles.wrapper
        }
      >
        <Logo active={active} />
        <Nav
          active={active}
          siteList={siteList}
          contactList={contactList}
          socialList={socialList}
        />
      </Wrapper>
    </header>
  )
}

export default Header
