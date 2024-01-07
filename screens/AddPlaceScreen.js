import { useState, useEffect } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Colors } from '../utils/constants';
import CustomButton from '../components/UI/CustomButton';
import ImagePicker from '../components/Places/ImagePicker';
import LocationPicker from '../components/Places/LocationPicker';
import { useStore } from '../store/store';
import { Place } from '../models/place';
import { nowNotification } from '../utils/notification';

export default function AddPlaceScreen({ navigation }) {
  const { createPlaceAsync } = useStore().placeStore;
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageUri, setImageUri] = useState();
  const [pickedLocation, setPickedLocation] = useState(null);
  function alertValidation(message) {
    Alert.alert('Validation error!', message);
  }

  async function savePlaceHandler() {
    if (!title) return alertValidation('Title is required.');
    if (!imageUri) return alertValidation('Image is required.');
    if (!pickedLocation) return alertValidation('Location is required.');
    const newPlace = new Place(title, imageUri, pickedLocation);
    await createPlaceAsync(newPlace)
    await nowNotification("Place added successfully", "The place has been added to your favorite list");
    navigation.goBack();
  }


  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={(enteredText) => setTitle(enteredText)}
        />
      </View>

      <ImagePicker imageUri={imageUri} setImageUri={setImageUri} />
      <LocationPicker
        pickedLocation={pickedLocation}
        setPickedLocation={setPickedLocation}
        setIsGettingAddress={setIsLoading}
      />

      <CustomButton
        style={styles.saveButton}
        onPress={savePlaceHandler}
        isLoading={isLoading}
      >
        Save
      </CustomButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
  saveButton: {
    marginTop: 12,
  },
});
