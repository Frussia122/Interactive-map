import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHospitalSymbol, 
  faHotel,
  faCoffee, 
  faWheatAwnCircleExclamation,
  faSnowman,
  faMoneyBill } from '@fortawesome/free-solid-svg-icons';

import styled from 'styled-components';

const categories = [
  { 
    id: 'gdePoestBowlFood',
    title: 'Кафе',
    icon: faCoffee,
    query: 'Кафе',
    color: 'rgb(255, 161, 94)',
  },
  { 
    id: 'products',
    title: 'Продукы',
    icon: faWheatAwnCircleExclamation,
    query: 'Продукы',
    color: 'rgb(96, 168, 240)',
  },
  { 
    id: 'hotel',
    title: 'Гостиницы',
    icon: faHotel,
    query: 'Отель',
    color: 'rgb(156, 137, 250)',
  },
  { 
    id: 'drugstore',
    title: 'Аптеки',
    icon: faHospitalSymbol,
    query: 'Аптека',
    color: 'rgb(141, 194, 87)',
  },
  {
    id: 'sport',
    title: 'Спорт',
    icon: faSnowman,
    query: 'Фитнес',
    color: 'rgb(245, 140, 182)',
  },
  {
    id: 'atm',
    title: 'Банкомат',
    icon: faMoneyBill,
    query: 'Банкомат',
    color: 'rgb(105, 191, 170)',
  },
];


const CategoriesWrapper = styled.ul`
  position: absolute;
  right: 0;
  top: 50px;
  display: grid;
  grid-template-columns: auto auto auto;
  background-color: #2196F3;
  padding: 20px 5px 20px 20px;
  background-color: white;
  max-width: 350px;
  z-index:50;
  gap: 10px 0px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`;
const CategorieItem = styled.li `
    cursor: pointer;
    text-align: center;
    list-style: none;
    display: flex;
    
    align-items: center;
    flex-direction: column-reverse;
    margin-right: 25px;
    font-size: 14px;
    svg{
      font-size: 22px;
    }
`;

function MapSearchCategory({
  handleSearchPlaces, 
  setCurrentPlaces,
  setSearchValue,
}) {
 
  const handleChoosenPlaces = (query,e,requestQuery ) => {
    handleSearchPlaces(e, requestQuery, setCurrentPlaces);
    setSearchValue(query);
  };


  return (
    <CategoriesWrapper>
      {categories.map(category => (
        <CategorieItem 
          onClick={(e) => handleChoosenPlaces(category.query, e, category.query)} 
          key={category.id}>
          <span>{category.title}</span>
          <div  style={{
            background: `${category.color}`,
            color: 'white',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', 
          }} >
            <FontAwesomeIcon icon={category.icon} />
          </div>
        </CategorieItem>
      ))}
    </CategoriesWrapper>
  );
}

export default MapSearchCategory;