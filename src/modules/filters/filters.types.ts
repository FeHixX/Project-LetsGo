import { ChangeEvent } from 'react';

export interface FiltersProps {
  className?: string;
  onChangeTransport?: (e: ChangeEvent<HTMLInputElement>) => void;
  valueTransport?: string;
}

export interface AccordionProps {
  [key: string]: boolean;
}