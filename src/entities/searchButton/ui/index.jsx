import { useDispatch, useSelector } from "react-redux";
import { currentInputValue, setInputValue } from 'shared/models/slices/controlsDataSlice';
import { setPlacesPanel } from "shared/models/slices/controlsSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import searchProvider from "shared/utils/controls/searchProvider";
import { Button } from "./styled";

export const SearchButton = ({ setIsOpen, mapRef }) => {
  const dispatch = useDispatch();
  const inputValue = useSelector(currentInputValue);

  const handleSearch = () => {
    if (inputValue) {
      setIsOpen(true);
      dispatch(setPlacesPanel(true));
      searchProvider(
        mapRef,
        inputValue,
        dispatch,
        '',
        '',
      );
      dispatch(setInputValue(''));
    }
  };

    return (
        <Button type="button" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearchLocation} />
        </Button>
    )
}