import { useState } from 'react';
import { Wrapper, Input } from './styled';
import  inputs from '../models/routeInputs';
import { useDispatch } from 'react-redux';
import { suggestEvent } from 'shared/utils/controls/addSuggestView';

import {
    setRouteTo,
    setRouteFrom,
  } from 'shared/models/slices/controlsDataSlice';

export const RouteInputs = ({ routeFromSuggest, routeToSuggest }) => {
    const [localRouteTo, setLocalRouteTo] = useState('');
    const [localRouteFrom, setLocalRouteFrom] = useState('');
    const [debounceTimer, setDebounceTimer] = useState(null);
    const dispatch = useDispatch();

    const handleRouteChange = (e, type) => {
        const { value } = e.target;
        if (type === 'from') {
          setLocalRouteFrom(e.target.value);
        } else if (type === 'to') {
          setLocalRouteTo(e.target.value);
        }
        clearTimeout(debounceTimer);
    
        setDebounceTimer(setTimeout(() => {
          if (type === 'from') {
            suggestEvent(routeFromSuggest, dispatch, setRouteFrom, 300, setLocalRouteFrom);
            dispatch(setRouteFrom(value));
          } else if (type === 'to') {
            suggestEvent(routeToSuggest, dispatch, setRouteTo, 300, setLocalRouteTo);
            dispatch(setRouteTo(value));
          }
        }, 500));
      };

    return (
      <Wrapper>
        {inputs.map((input) => (
          <Input
            value={input.id === 'routeTo' ? localRouteTo : localRouteFrom}
            onChange={(e) => handleRouteChange(e, input.type)}
            id={input.id}
            key={input.id}
            placeholder={input.placeholder}
          />
        ))}
      </Wrapper>
    )
}