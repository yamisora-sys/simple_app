import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { AutoFocus, Camera, CameraType } from 'expo-camera';
import { Video } from 'expo-av';
import * as Device from 'expo-device';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { nowNotification } from '../../utils/notification';
export default function VideoRecord () {
    const cameraRef = useRef(null);
    const [Recording, setRecording] = useState(false);
    const [videoUri , setVideoUri] = useState(null);
    const cameraDevice = Device.deviceName;
    const [hasPermission, setHasPermission] = useState(null);

    const onRecord = async () => {
        setRecording(true);
        cameraRef.current.recordAsync({ maxDuration: 3600, quality: "low" }).then((video) => {
            setVideoUri(video.uri);
        }).catch((error) => {
            setRecording(false);
            console.log(error);
        });
    }
    const onStopRecord = () => {
        cameraRef.current.stopRecording();
        setRecording(false);
    }
    console.log(videoUri);

    const onSave = async () => {
        await MediaLibrary.createAssetAsync(videoUri);
        // await nowNotification("Video Saved", "Your video has been saved");
        setVideoUri(null);
    }

    useEffect(() => {
        const { status } = Permissions.askAsync(Permissions.AUDIO_RECORDING);
    })
    if(videoUri) {
        return (
            <View style={styles.container}>
                <Video 
                source={{ uri: videoUri }}
                style={styles.video}
                useNativeControls
                resizeMode="contain"
                />
                {/* re record */}
                <TouchableOpacity onPress={() => setVideoUri(null)}>
                    <Text style={styles.btnRe}>Re Record</Text>
                </TouchableOpacity>
                {/* save */}
                <TouchableOpacity onPress={() => onSave()}>
                    <Text style={styles.btnSave}>Save</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
            <Camera 
            deivce={cameraDevice}
            ref={cameraRef} style={styles.video} type={CameraType.back} video={true}>
                <View style={styles.buttonContainer}>
                    {
                        Recording ? (
                            <TouchableOpacity onPress={onStopRecord}>
                                <Text style={styles.btnRe}>Stop</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={onRecord}>
                                <Text style={styles.btnSave}>Record</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </Camera>
    )
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
        width: "100%",
        height: "100%",
    },
    emoji: {
        textAlign: "center",
        fontSize: 48,
        marginBottom: 20,
    }
});