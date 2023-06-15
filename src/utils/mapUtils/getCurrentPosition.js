import mapboxgl from 'mapbox-gl';

const getCurrentPosition = (mapRef) => {

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        mapRef.current.setCenter([longitude, latitude]);
  
        localStorage.setItem('currentLatitude', latitude);
        localStorage.setItem('currentLongitude', longitude);
  
        mapRef.current.on('load', () => {
          new mapboxgl.Marker()
            .setLngLat([longitude, latitude])
            .addTo(mapRef.current);
        });
      },
      error => {
        console.log('Error getting user location:', error);
      }
    );
    
  };
  
  export default getCurrentPosition;