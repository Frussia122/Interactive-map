import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import CurrentLocationButton from 'UI/currentLocationButton/CurrentLocationButton';
import MapSearchCotrol from 'UI/mapSearchControl/MapSearchForm';

import initializeMap from 'utils/mapUtils/initializeMap';
import getCurrentPosition from 'utils/mapUtils/getCurrentPosition';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;

function Map() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  useEffect(() => {
    mapRef.current = initializeMap(mapContainerRef);
    getCurrentPosition(mapRef);
    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }}>
      <CurrentLocationButton mapRef={mapRef} />
      <MapSearchCotrol mapRef={mapRef} />
    </div>
  );
}

export default Map;
