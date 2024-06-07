import { FC } from 'react'
import Image from 'next/image'
import { Wrapper } from '@/ui'
import IconTelegram from '@icons/telegram.svg'
import IconVKontakte from '@icons/vkontakte.svg'
import IconYoutube from '@icons/youtube.svg'

import styles from './footer.module.scss'
import { FooterSocialItemI } from './footer.types'
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
        <div className={styles.logo_wrapper}>
          <a className={styles.logo_desktop} href="/">
            <Image
              src="icons/logo_full.svg"
              alt="Логотип сайта."
              width={200}
              height={50}
            />
          </a>
          <a className={styles.logo_mobile} href="/">
            <Image
              src="icons/logo_mobile.svg"
              alt="Логотип сайта."
              width={96}
              height={15}
            />
          </a>
        </div>
        <Social items={socialList} />
      </Wrapper>
    </footer>
  )
}

export default Footer
