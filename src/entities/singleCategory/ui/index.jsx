
import { CategoryItem, Circle } from "./styled"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import searchProvider from 'shared/utils/controls/searchProvider';
import { useDispatch } from "react-redux";
import { setPlacesPanel } from "shared/models/slices/controlsSlice";

export const SingleCategory = ({ mapRef, data }) => {
  const dispatch = useDispatch();
    
  const handleChosenPlaces = (query) => {
    dispatch(setPlacesPanel(true));
    searchProvider(mapRef, query, dispatch);
  };

    return (
      <>
        <CategoryItem
          onClick={() => handleChosenPlaces(data.query)}
        >
          <span>{data.title}</span>
          <Circle style={{background: `${data.color}`}}>
            <FontAwesomeIcon icon={data.icon} />
          </Circle>
        </CategoryItem>
      </>
    )
};
