/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

export const MapYContext = createContext();

export function MapYProvider({ children }) {
  const [uid, setUid] = useState(null);

  return (
    <MapYContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        uid,
        setUid,
      }}
    >
      {children}
    </MapYContext.Provider>
  );
}
