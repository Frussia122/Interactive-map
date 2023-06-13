import React, { useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYW1pZGdhcmQiLCJhIjoiY2xpdTU2YTl6MHY3ZjNubzdtN2szcHA4bSJ9.NSfezHJZVWpHKWKob-s4xg';

const Map = () => {
  const mapContainerRef = useRef(null);


  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/navigation-night-v1',
      center: [0, 0],
      zoom: 14
    });

    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        map.setCenter([longitude, latitude]);
        
      });
    }
    
    return () => {
        map.remove(); 
        

    };
  }, []);
 

  return <div ref={mapContainerRef} style={{ width: '59%', height: '800px' }} />;
};

export default Map;

