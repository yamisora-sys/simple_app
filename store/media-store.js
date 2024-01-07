import { makeAutoObservable } from 'mobx';
import * as MediaLibrary from 'expo-media-library';

export default class MediaStore {
    media = [];
    
    constructor() {
        makeAutoObservable(this);
    }
    
    setMedia = (media) => {
        // sort by creation time descending
        this.media = media.sort((a, b) => b.creationTime - a.creationTime);
    };
    
    loadMediaAsync = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === 'granted') {
        const albums = await MediaLibrary.getAlbumsAsync();
        let data = [];
        for (let i = 0; i < albums.length; i++) {
            const album = albums[i];
            const photo = await MediaLibrary.getAssetsAsync({
            album: album,
            mediaType: MediaLibrary.MediaType.photo,
            });
            data = data.concat(photo.assets);
            const video = await MediaLibrary.getAssetsAsync({
            album: album,
            mediaType: MediaLibrary.MediaType.video,
            });
            data = data.concat(video.assets);
        }
        this.setMedia(data);
        }
    };
}