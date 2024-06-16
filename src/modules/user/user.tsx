import { FC } from 'react'
import Image from 'next/image'
import { IconCheckbox, Textarea, Wrapper } from '@/ui'
import { IconCheckboxItemI } from '@/ui/iconCheckbox/iconCheckbox.types'
import IconBicycle from '@icons/icon_bicycle.svg'
import IconBus from '@icons/icon_bus.svg'
import IconPlane from '@icons/icon_plane.svg'
import IconRun from '@icons/icon_run.svg'
import classNames from 'classnames'

import { Level } from '../level'
import styles from './user.module.scss'
import { UserProps } from './user.types'

const checkboxList: IconCheckboxItemI[] = [
  {
    label: 'Самолет',
    value: 'plane',
    name: 'transport',
    icon: <IconPlane />
  },
  {
    label: 'Автобус',
    value: 'bus',
    name: 'transport',
    icon: <IconBus />
  },
  {
    label: 'Велосипед',
    value: 'bicycle',
    name: 'transport',
    icon: <IconBicycle />
  },
  {
    label: 'Пешком',
    value: 'run',
    name: 'transport',
    icon: <IconRun />
  }
]

const User: FC<UserProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <section className={rootClassName}>
      <Wrapper className={styles.wrapper}>
        <div className={styles.form}>
          <form
            action="#"
            method="POST"
            encType="multipart/form-data"
            autoComplete="off"
          >
            <Level className={styles.level} level={80} />
            <div className={styles.image}>
              <Image
                src={`${process.env.NODE_ENV === 'production' ? '/intern-pognali-1-6' : ''}/images/demin.jpg`}
                width={220}
                height={237}
                quality={85}
                alt="Аватарка"
              />
            </div>
            <fieldset className={styles.tags}>
              <legend className={styles.label}>Тэги</legend>
              <Textarea
                name="tags"
                maxLength={70}
                placeholder="Коротко о себе в виде 5-8 хештэгов"
                rows={1}
              />
            </fieldset>
            <div className={styles.load}>
              <label>
                Сменить фото
                <input type="file" name="photo" />
              </label>
            </div>
            <fieldset className={styles.transport}>
              <legend className={styles.label}>Транспорт</legend>
              <IconCheckbox items={checkboxList} />
            </fieldset>
          </form>
        </div>
      </Wrapper>
    </section>
  )
}

export default User
