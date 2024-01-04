import { Alert, Image, StyleSheet, View, Text } from 'react-native';
import { launchCameraAsync, launchImageLibraryAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { Colors } from '../../utils/constants';
import OutlinedButton from '../UI/OutlinedButton';

export default function ImagePicker({ imageUri, setImageUri }) {
  const [permissionInfo, requestPermission] = useCameraPermissions();

  async function verifyPermissions() {
    if (permissionInfo.status !== PermissionStatus.GRANTED) {
      const response = await requestPermission();
      if (!response.granted) {
        Alert.alert(
          'Insufficient Permissions!',
          'You need to grant camera permission to use this app.'
        );
      }
      return response.granted;
    }
    return true;
  }

  async function takeImageHandler() {
    if (await verifyPermissions()) {
      const image = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });
      const uri =
        image?.assets && image.assets[0] ? image.assets[0].uri : undefined;
      setImageUri(uri);
    }
  }

  async function pickImageHandler() {
    if (await verifyPermissions()) {
      const image = await launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });
      const uri =
        image?.assets && image.assets[0] ? image.assets[0].uri : undefined;
      setImageUri(uri);
    }
  }

  return (
    <View>
      <View style={styles.imageContainer}>
        {!imageUri && <Text>No image taken yet.</Text>}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>

      <View style={styles.buttonContainer}>
        <OutlinedButton onPress={pickImageHandler} icon='image' style={styles.button}>
          Pick Image
        </OutlinedButton>
        <OutlinedButton onPress={takeImageHandler} icon='camera' style={styles.button}>
          Take Image
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: '48%', 
  },
});
