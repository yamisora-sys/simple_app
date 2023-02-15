import { useCallback, useLayoutEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import IconButton from '../components/UI/IconButton';
import { Screens } from '../utils/constants';

export default function MapScreen({ navigation, route }) {
  const defaultLocation = route.params?.defaultLocation;
  const readonly = route.params?.readonly;
  const [selectedLocation, setSelectedLocation] = useState({
    latitude:
      defaultLocation?.latitude != null ? defaultLocation.latitude : 37.78,
    longitude:
      defaultLocation?.longitude != null ? defaultLocation.longitude : -122.438,
  });

  const initialRegion = {
    ...selectedLocation,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const saveLocationHandler = useCallback(() => {
    navigation.navigate(Screens.AddPlace, {
      mapSelectedLocation: { ...selectedLocation },
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Map',
      headerRight: ({ tintColor }) =>
        !readonly && (
          <IconButton
            name='save'
            size={24}
            color={tintColor}
            onPress={saveLocationHandler}
          />
        ),
    });
  }, [navigation, saveLocationHandler, readonly]);

  function selectLocationHandler(event) {
    if (readonly) return;

    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  }

  return (
    <MapView
      initialRegion={initialRegion}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      <Marker title='Picked Location' coordinate={selectedLocation} />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
