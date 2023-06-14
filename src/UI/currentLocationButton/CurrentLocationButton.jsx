import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'

const Button = styled.button`
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


function CurrentLocationButton({onFlyToMarker}) {

  return (
    <Button onClick={() => onFlyToMarker()}>
       <FontAwesomeIcon  icon={faLocationArrow} />
    </Button>
  )
}

export default CurrentLocationButton