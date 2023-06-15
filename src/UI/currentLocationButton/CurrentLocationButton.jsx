import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'

const Button = styled.button`
  z-index: 100;
  position: absolute;
  top: 5px;
  left: 5px;  
  width: 45px;
  height: 45px;
  display:flex;
  justify-content: center;
  align-items: center;
  background: white;
  border: none;
  border-radius: 50%;
  font-size: 25px;
  cursor: pointer;
  
`

function CurrentLocationButton({mapRef}) {

  const handleFlyToMarker = () => {
    if (mapRef.current) {
      const latitude = localStorage.getItem('currentLatitude');
      const longitude = localStorage.getItem('currentLongitude');

      const markerLngLat = [longitude, latitude];
      mapRef.current.flyTo({
        center: markerLngLat,
        zoom: 14,
        speed: 2,
        curve: 2,
        easing: t => t,
        essential: true
      });
    }

  };
  return (
    <Button onClick={handleFlyToMarker}>
       <FontAwesomeIcon  icon={faLocationArrow} />
    </Button>
  )
}

export default CurrentLocationButton