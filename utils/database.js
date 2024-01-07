import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

const database = SQLite.openDatabase('lab5.db');

export function initialDatabase() {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places(
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          latitude REAL NOT NULL,
          longitude REAL NOT NULL
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
        `INSERT INTO places (title, imageUri, address, latitude, longitude)
        VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.latitude,
          place.location.longitude,
        ],
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
        'SELECT * FROM places',
        null,
        (_, result) =>
          resolve(
            result.rows._array.map(
              (p) => new Place(p.title, p.imageUri, p, p.id)
            )
          ),
        (_, error) => reject(error)
      );
    });
  });
}

export function deleteTable(){
  database.transaction((tx) => {
    tx.executeSql(
      'DROP TABLE places',
      null,
      (_, result) => console.log(result),
      (_, error) => console.log(error)
    );
  });
}