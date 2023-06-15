import axios from "axios";

const API_KEY = '6a841818-678b-42fd-a91b-a48f00fef66d';


const getPlaces = async (query) => {
    const latitude = localStorage.getItem('currentLatitude');
    const longitude = localStorage.getItem('currentLongitude');
  
    try {
      const response = await axios.get(
        `https://search-maps.yandex.ru/v1/?apikey=${API_KEY}&text=${encodeURIComponent(
          query
        )}&type=biz&lang=ru_RU&results=20&ll=${longitude},${latitude}`
      );
  
     return response.data.features;
    } catch (error) {
      console.error(error);
    }
  };

export default getPlaces;