import React, {createContext, useState, useContext} from 'react';

export type Location = {
  latitude: number;
  longitude: number;
};

type ContextType = {
  location: Location[];
  addLocation: (location: Location) => void;
};

export const LocationContext = createContext<ContextType>({
  location: [],
  addLocation: () => {},
});

export const useLocationContext = () => useContext(LocationContext);

export const LocationProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [photoLocation, setPhotoLocation] = useState<Location[]>([]);

  const addLocation = (location: Location) => {
    setPhotoLocation([...photoLocation, location]);
  };

  return (
    <LocationContext.Provider value={{location: photoLocation, addLocation}}>
      {children}
    </LocationContext.Provider>
  );
};
