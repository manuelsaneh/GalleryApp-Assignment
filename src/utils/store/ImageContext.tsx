import React, {createContext, useState, useContext} from 'react';
import {savePhotoToStorage} from '../storage/AsyncStorage';

export type Photo = {
  id: string;
  uri: string;
};

type ContextType = {
  photos: Photo[];
  addPhoto: (photo: Photo) => void;
  deletePhoto: (photoId: string) => void;
};

export const PhotoContext = createContext<ContextType>({
  photos: [],
  addPhoto: () => {},
  deletePhoto: () => {},
});

export const usePhotoContext = () => useContext(PhotoContext);

export const PhotoProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const addPhoto = (photo: Photo) => {
    setPhotos([...photos, photo]);
    savePhotoToStorage(JSON.stringify(photo));
  };

  const deletePhoto = (photoId: string) => {
    setPhotos(photos.filter(photo => photo.id !== photoId));
  };

  return (
    <PhotoContext.Provider
      value={{
        photos,
        addPhoto,
        deletePhoto,
      }}>
      {children}
    </PhotoContext.Provider>
  );
};
