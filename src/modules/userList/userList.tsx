import { FC, useEffect, useState } from 'react';
import { Pagination } from '@/modules/pagination';
import { Wrapper } from '@/ui';
import IconBicycle from '@icons/icon-bicycle.svg';
import IconBus from '@icons/icon-bus.svg';
import IconPlus from '@icons/icon-plus.svg';
import IconPlane from '@icons/icon-plane.svg';
import IconRun from '@icons/icon-run.svg';
import classNames from 'classnames';
import axios from 'axios';

import { Filters } from '../filters';
import { UserCard } from '../userCard';
import styles from './userList.module.scss';
import { UserListProps, TransformedUserData } from './userList.types';

interface CardData {
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
}

const UserList: FC<UserListProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);
  const [userData, setUserData] = useState<TransformedUserData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCards, setTotalCards] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const cardsPerPage = 4;

  const fetchCardData = async (page: number) => {
    try {
      const cardId = localStorage.getItem('cardId');
      if (!cardId) {
        console.error('CardId not found in localStorage');
        return null;
      }
      const response = await axios.get(`https://lets-go-8s43.onrender.com/cards/${cardId}`, {
        params: {
          page: page,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching card data:', error);
      return null;
    }
  };

  const loadCardData = async (page: number, append: boolean = false) => {
    const cardData = await fetchCardData(page);
    if (cardData && cardData.cardList) {
      const transformedData = cardData.cardList.map((card: CardData) => ({
        name: card.name,
        photo: card.avatarUrl,
        online: false,
        tags: card.hashTags.join(' '),
        likes: 0,
        countries: card.countryList.map((country) => ({
          name: country.countryData.name.rus,
          img: country.countryData.flags.png,
        })),
        transport: [
          { icon: <IconPlane />, label: 'Авиаперелет', checked: card.transport.includes('plane') },
          { icon: <IconBus />, label: 'Автотранспорт', checked: card.transport.includes('bus') },
          { icon: <IconBicycle />, label: 'Велосипед', checked: card.transport.includes('bike') },
          { icon: <IconRun />, label: 'Пешком', checked: card.transport.includes('walk') },
        ],
        level: 0,
      }));
      if (append) {
        setUserData((prevData) => [...prevData, ...transformedData]);
      } else {
        setUserData(transformedData);
      }
      setTotalCards(cardData.totalCardsCount || transformedData.length);
      setTotalPages(Math.ceil(cardData.totalCardsCount / cardsPerPage));
    }
  };

  useEffect(() => {
    loadCardData(currentPage);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    loadCardData(page);
  };

  const handleShowMore = () => {
    const nextPage = currentPage + 1;
    loadCardData(nextPage, true);
    setCurrentPage(nextPage);
    setTotalPages((prevPages) => prevPages - 1);
  };

  return (
    <section className={rootClassName}>
      <h2 className="visually-hidden">Список попутчиков</h2>
      <Wrapper className={styles.wrapper}>
        <Filters className={styles.filters} />
        <ul className={styles.list}>
          {userData.map((item, index) => (
            <li key={index}>
              <UserCard item={item} />
            </li>
          ))}
        </ul>
        {userData.length < totalCards && (
          <button className={styles.button} onClick={handleShowMore}>
            <IconPlus />
            Показать еще
          </button>
        )}
        <Pagination
          className={styles.pagination}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Wrapper>
    </section>
  );
};

export default UserList;