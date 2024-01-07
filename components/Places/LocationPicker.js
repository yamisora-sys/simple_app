import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location';
import { Colors, Screens } from '../../utils/constants';
import OutlinedButton from '../UI/OutlinedButton';
import { useEffect, useState } from 'react';
import { getAddress, getMapPreviewUrl } from '../../utils/location';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
let locationVersion = 0;

export default function LocationPicker({
  pickedLocation,
  setPickedLocation,
  setIsGettingAddress,
}) {
  const [permissionInfo, requestPermission] = useForegroundPermissions();
  const navigation = useNavigation();
  const route = useRoute();
  const mapSelectedLocation = route.params?.mapSelectedLocation;
  const [pickedLocationUrl, setPickedLocationUrl] = useState(null);

  async function locationChangedHandler({ latitude, longitude }) {
    if (
      latitude === pickedLocation?.latitude &&
      longitude === pickedLocation?.longitude
    ) {
      return;
    }

    setIsGettingAddress(true);
    const savedVersion = ++locationVersion;
    const address = await getAddress(latitude, longitude);
    if (savedVersion === locationVersion) {
      setPickedLocation({ latitude, longitude, address });
      setIsGettingAddress(false);
    }
  }
  console.log(pickedLocationUrl)
  console.log(pickedLocation)
  console.log(mapSelectedLocation)
  useEffect(() => {
    setPickedLocationUrl(
      getMapPreviewUrl(mapSelectedLocation?.latitude, mapSelectedLocation?.longitude)
    );
    if (mapSelectedLocation) locationChangedHandler(mapSelectedLocation);
  }, [mapSelectedLocation]);

  async function verifyPermissions() {
    if (permissionInfo.status !== PermissionStatus.GRANTED) {
      const response = await requestPermission();
      if (!response.granted) {
        Alert.alert(
          'Insufficient Permissions!',
          'You need to grant location permission to use this app.'
        );
      }
      return response.granted;
    }
    return true;
  }

  async function getLocationHandler() {
    if (await verifyPermissions()) {
      const location = await getCurrentPositionAsync();
      locationChangedHandler(location.coords);
    }
  }

  function pickOnMapHandler() {
    navigation.navigate(Screens.Map, { defaultLocation: pickedLocation });
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {pickedLocationUrl && (
          <MapView
            style={styles.image}
            region={{
              latitude: pickedLocation?.latitude || 0,
              longitude: pickedLocation?.longitude || 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            zoomEnabled={false}
            scrollEnabled={false}
            minZoomLevel={0}
          >
            <Marker
              coordinate={{
                latitude: pickedLocation?.latitude || 0,
                longitude: pickedLocation?.longitude || 0,
              }}
            />
          </MapView>
        )}
        {!pickedLocationUrl && <Text>No location taken yet.</Text>}
      </View>

      <View style={styles.buttons}>
        <OutlinedButton
          icon='location'
          onPress={getLocationHandler}
          style={styles.button1}
        >
          Locate User
        </OutlinedButton>
        <OutlinedButton
          icon='map'
          onPress={pickOnMapHandler}
          style={styles.button2}
        >
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
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
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button1: {
    flex: 1,
    marginLeft: 0,
    marginRight: 6,
  },
  button2: {
    flex: 1,
    marginLeft: 6,
    marginRight: 0,
  },
});
