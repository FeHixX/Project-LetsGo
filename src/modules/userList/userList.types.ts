import { ReactNode } from 'react'

export interface UserListProps {
  className?: string;
  initialCardData?: {
    cardId?: string;
    cardList?: Array<{
      name: string;
      avatarUrl: string;
      hashTags: string[];
      countryList: Array<{
        countryData: {
          name: { rus: string };
          flags: { png: string };
        };
      }>;
      transport: string[];
    }>;
  };
  selectedContinent?: string | null;
  selectedCountry?: string | null;
}

export interface TransformedUserData {
  cardId: string;
  name: string
  photo: string
  online: boolean
  tags: string
  likes: number
  countries: { name: string; img: string }[]
  transport: { icon: ReactNode; label: string; checked: boolean }[]
  level: number
}