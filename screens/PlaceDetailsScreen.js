import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import OutlinedButton from '../components/UI/OutlinedButton';
import { Colors, Screens } from '../utils/constants';

export default function PlaceDetailsScreen({ route, navigation }) {
  const place = route.params.place;

  function viewOnMapHandler() {
    navigation.navigate(Screens.Map, {
      defaultLocation: place.location,
      readonly: true,
    });
  }

  return (
    <ScrollView>
      <Image source={{ uri: place.imageUri }} style={styles.image} />

      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <OutlinedButton
          icon='map'
          onPress={viewOnMapHandler}
          style={styles.button}
        >
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '35%',
    minHeight: 300,
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    width: 200,
  },
});
