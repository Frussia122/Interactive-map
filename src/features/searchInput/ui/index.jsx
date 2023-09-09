import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { suggestEvent } from 'shared/utils/controls/addSuggestView';
import { setInputValue } from 'shared/models/slices/controlsDataSlice';
import { Input } from './styled';

export const SearchInput = ({ currentSuggest }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debounceTimer, setDebounceTimer] = useState(null);
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { value } = e.target;
        setSearchTerm(value);
    
        clearTimeout(debounceTimer);
    
        setDebounceTimer(setTimeout(() => {
          suggestEvent(currentSuggest, dispatch, setInputValue, 1000, setSearchTerm);
          dispatch(setInputValue(value));
        }, 1000));
    };

    return (
        <Input
            placeholder="Поиск мест и адресов"
            value={searchTerm}
            onChange={handleInputChange}
            id="suggest"
        />
    )
}