import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';
import CurrentLocationButton from 'UI/currentLocationButton/CurrentLocationButton';



mapboxgl.accessToken = 'pk.eyJ1IjoiYW1pZGdhcmQiLCJhIjoiY2xpdTU2YTl6MHY3ZjNubzdtN2szcHA4bSJ9.NSfezHJZVWpHKWKob-s4xg';

const Map = () => {
  const mapContainerRef = useRef(null);
  let map;
  
  useEffect(() => {
    map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/navigation-night-v1',
      center: [0, 0],
      zoom: 14
    });

   
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          map.setCenter([longitude, latitude]);


          localStorage.setItem('currentLatitude', latitude);
          localStorage.setItem('currentLongitude', longitude);

          map.on('load', () => {
            new mapboxgl.Marker()
              .setLngLat([longitude, latitude])
              .addTo(map);
         })
        },
        error => {
          console.log('Error getting user location:', error);
        });
    

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      placeholder: 'Поиск места' 
    });

    map.addControl(geocoder);

    geocoder.on('result', (e) => {
      const { result } = e;
      console.log('Результат поиска:', result);
    });

    return () => {
      map.remove();
    };
  }, []);

  const handleFlyToMarker = () => {
    if (map) {
      const latitude = localStorage.getItem('currentLatitude');
      const longitude = localStorage.getItem('currentLongitude');


      const markerLngLat = [longitude, latitude]; // Replace with your marker's coordinates
      map.flyTo({
        center: markerLngLat,
        zoom: 14,
        speed: 2,
        curve: 2,
        easing: t => t,
        essential: true
      });
    }
  };

  return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }}> 
        <CurrentLocationButton onFlyToMarker={handleFlyToMarker} />
  </div>;
};

export default Map;