import {
    ButtonWrapper
} from './styled';
import { Button } from 'shared/styled/styled';
import { handlePanToLocation } from 'shared/utils/controls/currentPlacesHandlers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faRoute } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setMultiRouteCoords } from 'shared/models/slices/controlsDataSlice';
import { setRoutePanel } from 'shared/models/slices/controlsSlice';
import { AddToFavorites } from 'entities/addToFavorites';

export const Buttons = ({ geometry, properties, mapRef }) => {
    const dispatch = useDispatch();

    const handleClick = (coords) => {
        dispatch(setRoutePanel(true));
        dispatch(setMultiRouteCoords(coords));
      };

    return (
      <ButtonWrapper>
        <Button onClick={() => handlePanToLocation(geometry.coordinates, mapRef)}>
          <FontAwesomeIcon icon={faLocationArrow} />
        </Button>
        <Button onClick={() => handleClick(geometry.coordinates)}>
          <FontAwesomeIcon icon={faRoute} />
        </Button>
        <AddToFavorites properties={properties} geometry={geometry} />
      </ButtonWrapper>
    )
}