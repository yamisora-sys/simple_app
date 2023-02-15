export class Place {
  constructor(title, imageUri, { address, latitude, longitude }, id) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = { latitude, longitude };
    this.id = id;
  }
}
