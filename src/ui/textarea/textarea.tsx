'use client'

import { FC, useEffect, useRef } from 'react'

import { TextareaProps } from './textarea.types'

const Textarea: FC<TextareaProps> = ({
  name,
  maxLength,
  placeholder,
  rows,
  value,
  onChange
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  useEffect(() => {
    adjustHeight()
  }, [])

  return (
    <label>
      <textarea
        ref={textareaRef}
        name={name}
        maxLength={maxLength}
        placeholder={placeholder}
        rows={rows}
        onInput={adjustHeight}
        value={value}
        onChange={onChange}
      />
    </label>
  )
}

export default Textarea
