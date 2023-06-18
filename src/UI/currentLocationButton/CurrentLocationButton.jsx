/* eslint-disable react/prop-types */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import Button from './styled';

function CurrentLocationButton({ mapRef }) {
  const handleFlyToMarker = () => {
    if (mapRef.current) {
      const latitude = localStorage.getItem('currentLatitude');
      const longitude = localStorage.getItem('currentLongitude');

      const markerLngLat = [longitude, latitude];
      mapRef.current.flyTo({
        center: markerLngLat,
        zoom: 17,
        speed: 2,
        curve: 2,
        easing: (t) => t,
        essential: true,
      });
    }
  };
  return (
    <Button onClick={handleFlyToMarker}>
      <FontAwesomeIcon icon={faLocationArrow} />
    </Button>
  );
}

export default CurrentLocationButton;
