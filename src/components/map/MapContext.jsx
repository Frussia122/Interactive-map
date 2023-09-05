/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

export const MapYContext = createContext();

export function MapYProvider({ children }) {
  const [currentPlaces, setCurrentPlaces] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [multiRoute, setMultiRoute] = useState();
  const [uid, setUid] = useState(null);

  return (
    <MapYContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        currentPlaces,
        setCurrentPlaces,
        inputValue,
        setInputValue,
        multiRoute,
        setMultiRoute,
        uid,
        setUid,
      }}
    >
      {children}
    </MapYContext.Provider>
  );
}
