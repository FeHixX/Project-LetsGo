import { ChangeEvent } from 'react'

export interface UserProps {
  className?: string
  valueHashtags?: string
  valueTransport?: string
  onChangeHashtags?: (e: ChangeEvent<HTMLInputElement>) => void
  onChangeTransport?: (e: ChangeEvent<HTMLInputElement>) => void
}
