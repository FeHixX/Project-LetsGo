'use client'

import { FC, useEffect, useRef, useState } from 'react'
import useResponsive from '@/shared/hooks/useResponsive'
import { Button, IconCheckbox, SliderRange } from '@/ui'
import classNames from 'classnames'

import { checkboxList } from '../user/user'
import ButtonHeader from './buttonHeader'
import styles from './filters.module.scss'
import { AccordionProps, FiltersProps } from './filters.types'
import ListCheckboxes from './listCheckboxes'

const hobbiesList = [
  { name: 'hobbie', value: 'gym', label: 'Спортзал' },
  { name: 'hobbie', value: 'hookah', label: 'Кальян' },
  { name: 'hobbie', value: 'sofa', label: 'Диван' }
]

const musicsList = [
  { name: 'music', value: 'heavy-rock', label: 'Тяжелый рок' },
  { name: 'music', value: 'russian-rap', label: 'Русский рэп' },
  { name: 'music', value: 'eurodens', label: 'Евроденс' }
]

const foodsList = [
  { name: 'food', value: 'meat', label: 'Мясоед' },
  { name: 'food', value: 'pp', label: 'Сидит на ПП' },
  { name: 'food', value: 'vegan', label: 'Веган-сыроед' }
]

const Filters: FC<FiltersProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  const [accordionStates, setAccordionStates] = useState<AccordionProps>({
    hobbies: false,
    music: false,
    food: false,
    transport: false,
    level: false
  })

  const { isMobile, isDesktop } = useResponsive()
  const isMountedRef = useRef(true)

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const toggleAccordion = (section: string) => {
    if (isMobile || isDesktop) {
      setAccordionStates((prevStates) => ({
        ...prevStates,
        [section]: !prevStates[section]
      }))
    }
  }

  return (
    <div className={rootClassName}>
      <div className={styles.title}>Подберите идеального попутчика</div>
      <form action="#" method="get" autoComplete="off" id="filter">
        <fieldset
          className={styles.fieldset}
          data-accordion={accordionStates.hobbies}
        >
          <ButtonHeader
            className={styles.header}
            title="Хобби"
            onClick={() => toggleAccordion('hobbies')}
          />
          <div
            className={styles.wrapper}
            data-accordion={accordionStates.hobbies}
          >
            <ListCheckboxes items={hobbiesList} />
          </div>
        </fieldset>
        <fieldset
          className={styles.fieldset}
          data-accordion={accordionStates.music}
        >
          <ButtonHeader
            className={styles.header}
            title="Музыка"
            onClick={() => toggleAccordion('music')}
          />
          <div
            className={styles.wrapper}
            data-accordion={accordionStates.music}
          >
            <ListCheckboxes items={musicsList} />
          </div>
        </fieldset>
        <fieldset
          className={styles.fieldset}
          data-accordion={accordionStates.food}
        >
          <ButtonHeader
            className={styles.header}
            title="Еда"
            onClick={() => toggleAccordion('food')}
          />
          <div className={styles.wrapper} data-accordion={accordionStates.food}>
            <ListCheckboxes items={foodsList} />
          </div>
        </fieldset>
        <fieldset
          className={styles.fieldset}
          data-accordion={accordionStates.transport}
        >
          <ButtonHeader
            className={styles.header}
            title="Транспорт"
            onClick={() => toggleAccordion('transport')}
          />
          <div
            className={styles.wrapper}
            data-accordion={accordionStates.transport}
          >
            <IconCheckbox className={styles.transport} items={checkboxList} />
          </div>
        </fieldset>
        <fieldset
          className={styles.fieldset}
          data-accordion={accordionStates.level}
        >
          <ButtonHeader
            className={styles.header}
            title="Левел"
            onClick={() => toggleAccordion('level')}
          />
          <div
            className={styles.wrapper}
            data-accordion={accordionStates.level}
          >
            <SliderRange
              className={styles.slider}
              range={{ min: 0, max: 100 }}
              start={[30, 100]}
            />
          </div>
        </fieldset>
      </form>
      <Button
        form="filter"
        className={styles.button}
        colorScheme="white"
        size="sm"
        type="submit"
      >
        Показать
      </Button>
    </div>
  )
}

export default Filters
