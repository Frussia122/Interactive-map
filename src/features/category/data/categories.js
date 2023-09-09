import {
  faHospitalSymbol,
  faHotel,
  faCoffee,
  faWheatAwnCircleExclamation,
  faSnowman,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';

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
export default categories;
