import React, { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Textarea } from '@/ui'
import PolygonNext from '@icons/polygon-next.svg'
import PolygonPrev from '@icons/polygon-prev.svg'
import classNames from 'classnames'

import StepList from '../formNavigation/formNavigation'
import styles from './stepThreePastime.module.scss'

export interface StepThreePastimeProps {
  className?: string
  data: {
    companionCount: number
    children: boolean
    startDate: string
    endDate: string
    countryList: { name: string; description: string }[]
    hashTags: string[]
    transport: string[]
  }
  updateData: (data: Partial<{ Bosnia: string; Czechia: string }>) => void
  prevStep: () => void
  selectedCountries: Country[]
  updateHashTags: (e: ChangeEvent<HTMLInputElement>) => void
  updateTransport: (e: ChangeEvent<HTMLInputElement>) => void
}

interface Country {
  name: { common: string; rus: string }
  flags: {
    png: string
    svg: string
  }
  description?: string
}

interface FormData {
  companionCount: number
  children: boolean
  startDate: string
  endDate: string
  countryList: { name: string; description: string }[]
  hashTags: string[]
  transport: string[]
}

const StepThreePastime: FC<StepThreePastimeProps> = ({
  className,
  prevStep,
  selectedCountries,
  updateData,
  data
}) => {
  const rootClassName = classNames(styles.root, className)
  const [formData, setFormData] = useState<FormData>(data)
  const [isFormValid, setIsFormValid] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const router = useRouter()

  const validateForm = useCallback(() => {
    const newErrors: string[] = []
  
    if (formData.countryList.length === 0) {
      newErrors.push('Выберите хотя бы одну страну')
    }
  
    if (formData.countryList.some((country) => country.description.trim() === '')) {
      newErrors.push('Заполните план действий для всех выбранных стран')
    }
    if (formData.startDate === '') {
      newErrors.push('Выберите дату начала поездки')
    }
    if (formData.endDate === '') {
      newErrors.push('Выберите дату окончания поездки')
    }
    if (formData.hashTags.length === 0) {
      newErrors.push('Добавьте хотя бы один хэштег')
    }
    if (formData.transport.length === 0) {
      newErrors.push('Выберите хотя бы один вид транспорта')
    }
    if (formData.companionCount <= 0) {
      newErrors.push('Укажите количество попутчиков')
    }
  
    setErrors(newErrors)
    setIsFormValid(newErrors.length === 0)
  }, [formData])

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      countryList:
        prevData.countryList.length === 0
          ? selectedCountries.map((country) => ({
              name: country.name.rus,
              description: country.description || ''
            }))
          : prevData.countryList,
      hashTags: data.hashTags,
      transport: data.transport,
      companionCount: data.companionCount,
      startDate: data.startDate,
      endDate: data.endDate,
      children: data.children
    }))
  }, [selectedCountries, data])
  
  useEffect(() => {
    validateForm()
  }, [formData, validateForm])

  const handleArrayChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: 'countryList',
    index: number,
    subfield: 'name' | 'description' | null = null
  ) => {
    const value = e.target.value
    const updatedArray = [...formData[field]]
    if (field === 'countryList' && subfield) {
      const updatedCountry = {
        ...(updatedArray[index] as { name: string; description: string }),
        [subfield]: value
      }
      updatedArray[index] = updatedCountry
    }
    setFormData({ ...formData, [field]: updatedArray })
    validateForm()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
  
    validateForm()
    if (!isFormValid) {
      alert('Пожалуйста, заполните все необходимые поля')
      return
    }

    const validTransports = ['plane', 'bus', 'bike', 'walk']
    const filteredTransport = formData.transport.filter((transport) =>
      validTransports.includes(transport)
    )
    
    const filteredHashTags = formData.hashTags.filter(tag => tag.length >= 2)
    
    const updatedFormData = { 
      ...formData, 
      transport: filteredTransport,
      hashTags: filteredHashTags
    }
  
    const invalidCountries = updatedFormData.countryList.filter((country) => {
      return !selectedCountries.some((sc) => sc.name.rus === country.name)
    })
  
    if (invalidCountries.length > 0) {
      alert(
        'Наименование страны должно быть на русском языке из списка предложенных.'
      )
      return
    }
  
    const startDate = updatedFormData.startDate.split('T')[0]
    const endDate = updatedFormData.endDate.split('T')[0]
  
    const response = await fetch('https://lets-go-8s43.onrender.com/cards/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...updatedFormData, startDate, endDate })
    })
  
    if (!response.ok) {
      const data = await response.json()
      console.error(data)
      alert('Ошибка при отправке данных')
    } else {
      const data = await response.json()
      console.log(data)
      alert('Данные успешно отправлены!')
      updateData(data)
  
      if (data.id) {
        localStorage.setItem('cardId', data.id)
        console.log('Сохраненный ID карточки:', data.id)
        router.push('/companions')
      }
    }
  }

  const handlePrev = () => {
    prevStep()
  }

  return (
    <div className={rootClassName}>
      <div className={styles.formHead}>
        <div className={styles.formDescription}>
          <h2>Шаг 3. Развлечения</h2>
          <p>
            Наконец, расскажите о своих планах времяпровождения.
            <br />
            Можно писать в свободной форме и ставить тэги.
          </p>
        </div>
        <StepList currentStep={2} activeStep={2} setStep={() => {}} />
      </div>
      <form className={styles.formFinalStep} onSubmit={handleSubmit}>
        <label className={styles.label}>
          {formData.countryList.map((country, index) => (
            <div className={styles.country} key={country.name}>
              <div className={styles.countryInfo}>
                <div className={styles.countryName}>
                  <span className={styles.countryNameText}>{country.name}</span>
                </div>
                <div className={styles.countryImage}>
                  <Image
                    className={styles.countryFlags}
                    src={
                      selectedCountries.find((c) => c.name.rus === country.name)
                        ?.flags.png || ''
                    }
                    alt={`${country.name} flag`}
                    width={70}
                    height={47}
                  />
                </div>
              </div>
              <div className={styles.countryInput}>
                <Textarea
                  name="tags"
                  maxLength={70}
                  placeholder="План действий"
                  rows={1}
                  value={country.description}
                  onChange={(e) =>
                    handleArrayChange(
                      e as ChangeEvent<HTMLTextAreaElement>,
                      'countryList',
                      index,
                      'description'
                    )
                  }
                />
              </div>
            </div>
          ))}
        </label>
        {errors.length > 0 && (
          <div className={styles.errorMessages}>
            <p>Пожалуйста, заполните следующие данные:</p>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <div className={styles.formButtons}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={!isFormValid}
          >
            Отправить
            <PolygonNext />
          </button>
          <button
            className={`${styles.formButton} ${styles.formButtonPrev}`}
            onClick={handlePrev}
          >
            <PolygonPrev />
            На шаг назад
          </button>
        </div>
      </form>
    </div>
  )
}

export default StepThreePastime