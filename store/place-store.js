import { makeAutoObservable } from 'mobx';
import { getAllPlaces, insertPlace } from '../utils/database';

export default class PlaceStore {
  places = [];

  constructor() {
    makeAutoObservable(this);
  }

  addPlace = (place) => {
    this.places.push(place);
  };

  setPlaces = (places) => {
    this.places = places;
  };

  createPlaceAsync = async (place) => {
    place.id = await insertPlace(place);
    this.addPlace(place);
  };

  loadPlacesAsync = async () => {
    const places = await getAllPlaces();
    this.setPlaces(places);
  };
}
