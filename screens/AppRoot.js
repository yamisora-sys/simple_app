import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconButton from '../components/UI/IconButton';
import AddPlaceScreen from './AddPlaceScreen';
import AllPlacesScreen from './AllPlacesScreen';
import MapScreen from './MapScreen';
import Media from './MediaScreen';
import { Colors, Screens } from '../utils/constants';
import PlaceDetailsScreen from './PlaceDetailsScreen';
import { MaterialIcons } from '@expo/vector-icons';

import Video from '../components/Places/VideoRecord';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const PlacesStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: Colors.primary500 },
      headerTintColor: Colors.gray700,
      contentStyle: { backgroundColor: Colors.gray800 },
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
);

const MediaScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={"Media"}
      component={Media}
      options={{
        headerTitle: 'Add a new Place',
      }}
    />
  </Stack.Navigator>
);

export default function AppRoot() {
  return (
    <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, 
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Places') {
            iconName = 'place'; 
          } else if (route.name === 'MediaScreen') {
            iconName = 'perm-media'; 
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Places" component={PlacesStack} />
      <Tab.Screen name="MediaScreen" component={MediaScreen} />
      <Tab.Screen name="Video" component={Video} />
    </Tab.Navigator>
  </NavigationContainer>
  );
}
