import { ChangeEvent } from 'react';


export interface TextareaProps {
  name: string;
  maxLength: number;
  placeholder: string;
  rows: number;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
