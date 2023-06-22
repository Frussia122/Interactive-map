/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`
    position: absolute;
    right: 10px;
    z-index: 1000;
    top: 50%;
`;
const Button = styled.button`
    background-color: white;
    border: 1px solid transparent;
    height:50px;
    width:50px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s linear;
    color: #A5A5A5;
    &:hover{
        color: black;
    }
`;

function CurrentLocationControl({ mapRef }) {
  const handleReturnToLocation = () => {
    const latitude = Number(localStorage.getItem('currentLatitude'));
    const longitude = Number(localStorage.getItem('currentLongitude'));
    if (latitude) {
      mapRef.current.panTo([latitude, longitude], {
        flying: true,
        duration: 1000,
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
