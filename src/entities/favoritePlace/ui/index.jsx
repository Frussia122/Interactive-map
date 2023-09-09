import {
    Place,
    Name,
    Address,
} from './styled';
import { setRoutePanel } from 'shared/models/slices/controlsSlice';
import searchProvider from 'shared/utils/controls/searchProvider';
import { useDispatch } from 'react-redux';

export const FavoritePlace = ({mapRef, place, setIsFavorites, setIsOpen}) => {
    const dispatch = useDispatch();
    const handleSearch = (inputValue, name) => {
        setIsFavorites(false);
        setIsOpen(true);
        dispatch(setRoutePanel(false));
        searchProvider(mapRef, inputValue, dispatch, 'filter', name);
      };

    return (
        <Place type="button" onClick={() => handleSearch(place.name, place.description)} key={place.id}>
            <Name>{place.name}</Name>
            <Address>{place.description}</Address>
        </Place>
    )
}