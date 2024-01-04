import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

const database = SQLite.openDatabase('places.db');

export function initialDatabase() {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places(
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT,
          address TEXT,
          latitude REAL,
          longitude REAL
        )`,
        null,
        () => resolve(),
        (_, error) => reject(error)
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS media(
          id INTEGER PRIMARY KEY NOT NULL,
          placeId INTEGER,
          type TEXT,  -- 'image' or 'video'
          uri TEXT,
          FOREIGN KEY (placeId) REFERENCES places (id)
        )`,
        null,
        () => resolve(),
        (_, error) => reject(error)
      );
    });
  });
}

export function insertPlace(place) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, address, latitude, longitude)
        VALUES (?, ?, ?, ?)`,
        [
          place.title,
          place.address,
          place.location.latitude,
          place.location.longitude,
        ],
        (_, result) => {
          const placeId = result.insertId;
          
          // Insert images
          place.images.forEach((imageUri) => {
            insertMedia(placeId, 'image', imageUri);
          });

          // Insert videos
          place.videos.forEach((videoUri) => {
            insertMedia(placeId, 'video', videoUri);
          });

          resolve(placeId);
        },
        (_, error) => reject(error)
      );
    });
  });
}

export function insertMedia(placeId, type, uri) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO media (placeId, type, uri)
        VALUES (?, ?, ?)`,
        [placeId, type, uri],
        (_, result) => resolve(result.insertId),
        (_, error) => reject(error)
      );
    });
  });
}

export function getAllPlaces() {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        null,
        (_, result) => {
          const places = result.rows._array.map(
            (p) => new Place(p.title, p.address, p.location.latitude, p.location.longitude, p.id)
          );

          // Fetch media for each place
          Promise.all(
            places.map((place) => fetchMediaForPlace(place.id))
          ).then((mediaLists) => {
            mediaLists.forEach((mediaList, index) => {
              places[index].images = mediaList.filter((m) => m.type === 'image').map((m) => m.uri);
              places[index].videos = mediaList.filter((m) => m.type === 'video').map((m) => m.uri);
            });

            resolve(places);
          });
        },
        (_, error) => reject(error)
      );
    });
  });
}

export function fetchMediaForPlace(placeId) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM media WHERE placeId = ?`,
        [placeId],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      );
    });
  });
}
