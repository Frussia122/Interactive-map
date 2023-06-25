import axios from 'axios';

const API_KEY = process.env.REACT_APP_YANDEX_API;

const getPlaces = async (query, radius) => {
  const latitude = localStorage.getItem('currentLatitude');
  const longitude = localStorage.getItem('currentLongitude');
  try {
    const response = await axios.get(
      `https://search-maps.yandex.ru/v1/?apikey=${API_KEY}&text=${encodeURIComponent(
        query,
      )}&lang=ru_RU&results=100&ll=${longitude},${latitude}&spn=${radius},${radius}&rspn=1`,
    );
    return response.data.features;
  } catch (error) {
    throw new Error(`Error ${error}`);
  }
};

export default getPlaces;
