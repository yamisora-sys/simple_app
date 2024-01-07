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
import { nowNotification } from '../utils/notification';
import Constantns from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {useEffect, useState, useRef} from 'react';

import Video from '../components/Places/VideoRecord';
import { DeleteDB } from '../utils/database';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const BottomStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true, 
      })}
    >
      <Tab.Screen name="Places" component={AllPlacesScreen} options={({navigation}) =>{
        return {
          headerTitle: 'Places',
          headerRight: () => (
            <IconButton
              name='add'
              onPress={() => navigation.navigate(Screens.AddPlace)}
              size={30}
              color={Colors.gray700}
            />
          ),
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name={'place'} size={size} color={color} />
          }
        }
      }}/>
      <Tab.Screen name="Media Screen" component={Media} options={({navigation}) =>{
        return {
          headerTitle: 'Media',
          headerRight: () => (
            <IconButton
              name='camera'
              onPress={() => navigation.navigate("VideoRecord")}
              size={30}
              color={Colors.gray700}
            />
          ),
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name={'photo-library'} size={size} color={color} />
          }
        }
      }
      }/>
    </Tab.Navigator>
  );
}

export default function AppRoot() {
  return (
    <NavigationContainer>
    <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: Colors.primary500 },
      headerTintColor: Colors.gray700,
      contentStyle: { backgroundColor: Colors.gray800 },
    }}
  >
    <Stack.Screen
      name='Home'
      component={BottomStack}
      options={({ navigation }) => ({
        headerShown: false,
      })}
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
      <Stack.Screen
      name={"Media"}
      component={Media}
      options={{
        headerTitle: 'Add a new Place',
      }}
    />
    <Stack.Screen
      name={"VideoRecord"}
      component={Video}
      options={{
        headerTitle: 'Video Record',
      }}
    />
  </Stack.Navigator>
  </NavigationContainer>
  );
}
