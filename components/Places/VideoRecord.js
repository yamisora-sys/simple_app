import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { AutoFocus, Camera } from 'expo-camera';
import { Video } from 'expo-av';
import { insertVideo } from '../../utils/database';

import * as MediaLibrary from 'expo-media-library';

export default function App() {
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [isRecording, setIsRecording] = useState(false);
    const [video, setVideo] = useState();
    const [selectedPlace, setSelectedPlace] = useState(null);

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMicrophonePermission(microphonePermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
    }, []);

    if (hasCameraPermission === undefined || hasMicrophonePermission === undefined) {
        return <Text>Requestion permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted.</Text>
    }

    let recordVideo = () => {
        setIsRecording(true);
        let options = {
            quality: "1080p",
            maxDuration: 36000,
            mute: false
        };

        cameraRef.current.recordAsync(options).then((recordedVideo) => {
            setVideo(recordedVideo);
            setIsRecording(false);
        });
    };

    let stopRecording = () => {
        setIsRecording(false);
        cameraRef.current.stopRecording();
    };

    if (video) {
        let saveVideo = async () => {

            // Call the insertVideo function with the place ID and video URI
            await insertVideo(selectedPlace.id, video.uri);

            // Reset the video state
            setVideo(undefined);

            // Reload the places list after adding a video
            await placeStore.loadPlacesAsync();
        };

        return (
            <SafeAreaView style={styles.container}>
                <Video
                    style={styles.video}
                    source={{ uri: video.uri }}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                />
                {hasMediaLibraryPermission ? (
                    <TouchableOpacity style={styles.btnSave} onPress={saveVideo}>
                        <Text style={{ color: '#fff' }}>Save</Text>
                    </TouchableOpacity>
                ) : undefined}
                <TouchableOpacity style={styles.btnRe} onPress={() => setVideo(undefined)}>
                    <Text style={{ color: '#fff' }}>Re-Record</Text>
                </TouchableOpacity>
                <Text> </Text>
            </SafeAreaView>
        );
    }

    return (
        <Camera style={styles.container} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={isRecording ? stopRecording : recordVideo}>
              <Text style={styles.emoji}>{isRecording ? "🟥" : "🔴"}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.selectionContainer}>
            {/* Example: Display a list of places and allow the user to select one */}
            {placeStore.places.map((place) => (
              <TouchableOpacity
                key={place.id}
                onPress={() => setSelectedPlace(place)}
              >
                <Text>{place.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Camera>
      );
    }


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#666",
    },
    btnSave: {
        backgroundColor: "#0079AD",
        padding: 10,
        borderRadius: 5,
        margin: 10,
        width: "90%",
        alignItems: "center",
    },
    btnRe: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        margin: 10,
        width: "90%",
        alignItems: "center",
    },
    buttonContainer: {
        width: "100%",
        alignSelf: "center",
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        justifyContent: "space-around",
    },
    video: {
        flex: 1,
        alignSelf: "stretch"
    },
    emoji: {
        textAlign: "center",
        fontSize: 48,
        marginBottom: 20,
    }
});