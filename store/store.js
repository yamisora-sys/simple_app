import { createContext, useContext } from 'react';
import PlaceStore from './place-store';

export const store = {
  placeStore: new PlaceStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
