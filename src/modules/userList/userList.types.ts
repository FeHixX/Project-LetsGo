export interface UserListProps {
  className?: string
  cardData?: {
    cardList: Array<{
      name: string
      avatarUrl: string
      hashTags: string[]
      countryList: Array<{
        countryData: {
          name: { rus: string }
          flags: { png: string }
        }
      }>
      transport: string[]
    }>
  }
}