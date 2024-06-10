import { FC } from 'react'
import { Wrapper } from '@/ui'
import MailIcon from '@icons/mail.svg'
import PhoneIcon from '@icons/phone.svg'

import styles from './header.module.scss'
import { HeaderSiteItemI, HeaderSocialItemI } from './header.types'
import Logo from './logo'
import Nav from './nav'

const socialList: HeaderSocialItemI[] = [
  {
    label: 'phone',
    href: 'tel:+79837454545',
    description: 'Позвонить',
    icon: <PhoneIcon />
  },
  {
    label: 'mail',
    href: 'mailto:info@lifetour.com',
    description: 'Письмо на почту',
    icon: <MailIcon />
  }
]

const siteList: HeaderSiteItemI[] = [
  {
    label: 'service',
    href: '#',
    description: 'О сервисе'
  },
  {
    label: 'directions',
    href: `${process.env.NODE_ENV === 'production' ? '/intern-pognali-1-6' : ''}/directions`,
    description: 'Направления'
  },
  {
    label: 'companions',
    href: `${process.env.NODE_ENV === 'production' ? '/intern-pognali-1-6' : ''}/companions`,
    description: 'Попутчики'
  }
]

const Header: FC = () => {
  return (
    <header className={styles.root}>
      <Wrapper className={styles.wrapper}>
        <Logo />
        <Nav siteList={siteList} socialList={socialList} />
      </Wrapper>
    </header>
  )
}

export default Header
