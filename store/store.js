import { createContext, useContext } from 'react';
import PlaceStore from './place-store';
import MediaStore from './media-store';

export const store = {
  placeStore: new PlaceStore(),
  mediaStore: new MediaStore(),
};

export const StoreContext = createContext(store);

export const MediaContext = createContext(store.mediaStore);

export function useStore() {
  return useContext(StoreContext);
}

export const useMedia = () =>{
  return useContext(MediaContext);
}
