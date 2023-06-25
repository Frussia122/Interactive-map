/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

export const MapYContext = createContext();

export function MapYProvider({ children }) {
  const [placesPanel, setPlacesPanel] = useState(false);
  const [currentPlaces, setCurrentPlaces] = useState([]);
  const [routePanel, setRoutePanel] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isClose, setIsClose] = useState(false);

  return (
    <MapYContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        placesPanel,
        setPlacesPanel,
        currentPlaces,
        setCurrentPlaces,
        routePanel,
        setRoutePanel,
        inputValue,
        setInputValue,
        isClose,
        setIsClose,
      }}
    >
      {children}
    </MapYContext.Provider>
  );
}
