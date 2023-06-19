import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import CurrentLocationButton from 'UI/currentLocationButton/CurrentLocationButton';
import MapSearchCotrol from 'UI/mapSearchControl/MapSearchForm';

import initializeMap from 'utils/mapUtils/initializeMap';
import getCurrentPosition from 'utils/mapUtils/getCurrentPosition';
import loadingLogo from './loading.gif';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;

// eslint-disable-next-line react/prop-types
function Map() {
  const mapRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [mapLoading, setMapLoading] = useState(true);

  useEffect(() => {
    mapRef.current = initializeMap('map-container', setMapLoading);
    getCurrentPosition(mapRef);

    mapRef.current.on('load', () => {
      setMapLoading(false);
    });
    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <div id="map-container" style={{ width: '100%', height: '100vh' }}>
      <CurrentLocationButton mapRef={mapRef} />
      <MapSearchCotrol mapRef={mapRef} />

      {mapLoading ? (
        <div className="loader">
          <img src={loadingLogo} alt="" />
        </div>
      ) : (
        <div className="loader hide">
          <img src={loadingLogo} alt="" />
        </div>
      )}

    </div>
  );
}

export default Map;
