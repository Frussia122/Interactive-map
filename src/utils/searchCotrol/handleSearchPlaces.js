import getPlaces from 'services/getPlaces';




const handleSearchPlaces = async (e, searchValue, setCurrentPlaces) => {
    e.preventDefault();
    if (searchValue) {
      try {
        const places = await getPlaces(searchValue, 0.001);
        setCurrentPlaces(places);
        console.log(places)
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('No search');
    }
  };

  export default handleSearchPlaces;