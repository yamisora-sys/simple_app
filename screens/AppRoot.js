import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IconButton from '../components/UI/IconButton';
import AddPlaceScreen from './AddPlaceScreen';
import AllPlacesScreen from './AllPlacesScreen';
import MapScreen from './MapScreen';
import { Colors, Screens } from '../utils/constants';
import PlaceDetailsScreen from './PlaceDetailsScreen';

const Stack = createNativeStackNavigator();

export default function AppRoot() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 },
        }}
      >
        <Stack.Screen
          name={Screens.AllPlaces}
          component={AllPlacesScreen}
          options={{
            headerTitle: 'Your Favorite Places',
            headerRight: ({ tintColor }) => {
              const navigation = useNavigation();
              return (
                <IconButton
                  name='add'
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate(Screens.AddPlace)}
                />
              );
            },
          }}
        />

        <Stack.Screen
          name={Screens.AddPlace}
          component={AddPlaceScreen}
          options={{
            headerTitle: 'Add a new Place',
          }}
        />

        <Stack.Screen name={Screens.Map} component={MapScreen} />

        <Stack.Screen
          name={Screens.PlaceDetails}
          component={PlaceDetailsScreen}
          options={({ route }) => ({
            headerTitle: route.params.place.title,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
