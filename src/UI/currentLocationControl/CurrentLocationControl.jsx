/* eslint-disable react/prop-types */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { Wrapper, Button } from './styled';

function CurrentLocationControl({ mapRef }) {
  const handleReturnToLocation = () => {
    const latitude = Number(localStorage.getItem('currentLatitude'));
    const longitude = Number(localStorage.getItem('currentLongitude'));
    if (latitude) {
      mapRef.current.panTo([latitude, longitude], {
        flying: true,
        duration: 500,
      });
    }
  };
  return (
    <Wrapper>
      <Button>
        <FontAwesomeIcon onClick={handleReturnToLocation} icon={faLocationArrow} />
      </Button>
    </Wrapper>
  );
}

export default CurrentLocationControl;
