import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
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
    const [cameraPermission, setCameraPermission] = Camera.useCameraPermissions();
    const [microphonePermission, setMicrophonePermission] = Camera.useMicrophonePermissions();
    console.log(cameraPermission);
    useEffect(() => {
        if(cameraPermission === null || cameraPermission.status !== "granted") {
            Alert.alert("Permission Needed", "Camera permission is needed to use this app", [
                {
                    text: "Allow",
                    onPress: () => setCameraPermission(),
                },
                {
                    text: "Cancel",
                    onPress: () => setCameraPermission(),
                }
            ]);
        }
        if(microphonePermission === null || microphonePermission.status !== "granted") {
            Alert.alert("Permission Needed", "Microphone permission is needed to use this app", [
                {
                    text: "Allow",
                    onPress: () => setMicrophonePermission(),
                },
                {
                    text: "Cancel",
                    onPress: () => setMicrophonePermission(),
                }
            ]);
        }
        // const { status } = Permissions.askAsync(Permissions.AUDIO_RECORDING);
    }, [])

    const onRecord = async () => {
        if(cameraPermission.status === "granted") {
            setRecording(true);
        cameraRef.current.recordAsync({ maxDuration: 3600, quality: "low" }).then((video) => {
            setVideoUri(video.uri);
        }).catch((error) => {
            setRecording(false);
            console.error(error);
        });
        }

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

    if(videoUri) {
        return (
            <View style={styles.container}>
                <Video 
                source={{ uri: videoUri }}
                style={styles.video}
                useNativeControls
                resizeMode="contain"
                />
                <View style={styles.buttonContainer}>
                {/* re record */}
                <TouchableOpacity onPress={() => setVideoUri(null)}>
                    <Text style={styles.btnRerecord}>Re Record</Text>
                </TouchableOpacity>
                {/* save */}
                <TouchableOpacity onPress={() => onSave()}>
                    <Text style={styles.btnSave}>Save</Text>
                </TouchableOpacity>
                </View>
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
                                <Text style={styles.btnRe}>
                                    {/* icon white */}
                                    ⏹️
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={onRecord}>
                                <Text style={styles.btnRe}>
                                    {/* camera white */}
                                    🎥
                                </Text>
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
        margin: 10,
        textAlign: "center",
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
        color: "#fff",
    },
    btnRe: {
        backgroundColor: "#ffffff",
        borderRadius: 50,
        width: "100%",
        padding: 20,
        alignItems: "center",
        textAlign: "center",
        
    },
    buttonContainer: {
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
    },
    btnRerecord:{
        backgroundColor: "red",
        borderRadius: 50,
        width: "100%",
        padding: 20,
        alignItems: "center",
        textAlign: "center",
        color: "#fff",
    }
});