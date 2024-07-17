import { ChangeEvent, FC } from 'react'
import Image from 'next/image'
import { IconCheckbox, Textarea, Wrapper } from '@/ui'
import { IconCheckboxItemI } from '@/ui/iconCheckbox/iconCheckbox.types'
import IconBicycle from '@icons/icon-bicycle.svg'
import IconBus from '@icons/icon-bus.svg'
import IconPlane from '@icons/icon-plane.svg'
import IconRun from '@icons/icon-run.svg'
import classNames from 'classnames'

import { Level } from '../level'
import styles from './user.module.scss'
import { UserProps } from './user.types'

export const checkboxList: IconCheckboxItemI[] = [
  {
    label: 'Авиаперелет',
    value: 'plane',
    name: 'transport',
    icon: <IconPlane />
  },
  {
    label: 'Автотранспорт',
    value: 'bus',
    name: 'transport',
    icon: <IconBus />
  },
  {
    label: 'Велосипед',
    value: 'bike',
    name: 'transport',
    icon: <IconBicycle />
  },
  {
    label: 'Пешком',
    value: 'walk',
    name: 'transport',
    icon: <IconRun />
  }
]

const User: FC<UserProps> = ({
  className,
  valueHashtags,
  valueTransport = '',
  onChangeHashtags,
  onChangeTransport
}) => {
  const rootClassName = classNames(styles.root, className)

  const handleHashtagChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChangeHashtags) {
      const value = e.target.value
      const cursorPosition = e.target.selectionStart
  
      if (value[cursorPosition - 1] === '#') {
        const newValue = value.slice(0, cursorPosition - 1) + value.slice(cursorPosition)
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: newValue
          }
        } as unknown as ChangeEvent<HTMLTextAreaElement>
  
        onChangeHashtags(syntheticEvent as unknown as ChangeEvent<HTMLInputElement>)
        setTimeout(() => {
          e.target.setSelectionRange(cursorPosition - 1, cursorPosition - 1)
        }, 0)
        return
      }
  
      const words = value.split(' ')
      const formattedWords = words.map((word) => {
        // Удаляем все символы, кроме букв, цифр и '#'
        const cleanWord = word.replace(/[^а-яА-Яa-zA-Z0-9#]/g, '')
        if (cleanWord.startsWith('#')) {
          return cleanWord.slice(0, 20)
        } else {
          return '#' + cleanWord.slice(0, 19)
        }
      })
  
      // Удаляем дубликаты и ограничиваем количество хэштегов до 6
      const uniqueWords = Array.from(new Set(formattedWords)).slice(0, 6)
      const formattedValue = uniqueWords.join(' ')
  
      const hashTagsArray = formattedValue
        .split(' ')
        .filter((tag) => tag.trim() !== '')
  
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: hashTagsArray
        }
      } as unknown as ChangeEvent<HTMLInputElement>
  
      onChangeHashtags(syntheticEvent)
    }
  }

  const handleTransportChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChangeTransport) {
      onChangeTransport(e)
    }
  }

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
              <div className={styles.label}>
                <p>Тэги</p>
              </div>
              <Textarea
                name="tags"
                maxLength={70}
                placeholder="Коротко о себе в виде 5-8 хештэгов"
                rows={1}
                value={
                  Array.isArray(valueHashtags)
                    ? valueHashtags.join(' ')
                    : valueHashtags || ''
                }
                onChange={handleHashtagChange}
              />
            </fieldset>
            <div className={styles.load}>
              <label>
                Сменить фото
                <input type="file" name="photo" />
              </label>
            </div>
            <fieldset className={styles.transport}>
              <div className={styles.label}>
                <p>Транспорт</p>
              </div>
              <IconCheckbox
                items={checkboxList}
                value={valueTransport.split(', ')}
                onChange={handleTransportChange}
              />
            </fieldset>
          </form>
        </div>
      </Wrapper>
    </section>
  )
}

export default User
