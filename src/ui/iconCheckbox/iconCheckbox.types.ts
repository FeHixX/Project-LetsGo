import React, { ChangeEvent } from 'react';

export interface IconCheckboxItemI {
  label: string;
  value: string;
  name: string;
  icon: React.ReactNode;
}

export interface IconCheckboxProps {
  className?: string;
  items: IconCheckboxItemI[];
  value: string[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
