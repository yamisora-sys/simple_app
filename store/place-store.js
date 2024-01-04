import { makeAutoObservable } from 'mobx';
import { getAllPlaces, insertPlace, fetchMediaForPlace } from '../utils/database';

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

    // Insert media and update the place object with media information
    const media = await insertMediaForPlace(place.id, place.images, place.videos);
    place.images = media.filter((m) => m.type === 'image').map((m) => m.uri);
    place.videos = media.filter((m) => m.type === 'video').map((m) => m.uri);

    this.addPlace(place);
  };

  loadPlacesAsync = async () => {
    const places = await getAllPlaces();

    // Fetch media for each place
    for (const place of places) {
      const media = await fetchMediaForPlace(place.id);
      place.images = media.filter((m) => m.type === 'image').map((m) => m.uri);
      place.videos = media.filter((m) => m.type === 'video').map((m) => m.uri);
    }

    this.setPlaces(places);
  };
}

// Function to insert media for a specific place
async function insertMediaForPlace(placeId, images, videos) {
  const mediaPromises = [];

  images.forEach((imageUri) => {
    mediaPromises.push(insertMedia(placeId, 'image', imageUri));
  });

  videos.forEach((videoUri) => {
    mediaPromises.push(insertMedia(placeId, 'video', videoUri));
  });

  return Promise.all(mediaPromises);
}
