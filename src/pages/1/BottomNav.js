import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {HomeIndex} from './main/home/index.js';
import {Profile} from './main/Profile.js';
import {Favorite} from './main/Favorite.js';
import {Category} from './main/Category.js';
import { CurrentUserContext, ScreenHeaderContext} from "../../context/userContext.js";
import {useContext, useEffect} from 'react'


const Tab = createBottomTabNavigator();

export function BottomNav({ navigation }) {
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [screenHeader, setScreenHeader] = useContext(ScreenHeaderContext);

    useEffect(() => {
      if(!screenHeader){
        navigation.setOptions({headerShown: false})
      }
    }, [screenHeader])

    const hiddenHeader= (index) =>{
      if(index === 0){
        navigation.setOptions({headerShown: true})
      }
      else{
        navigation.setOptions({headerShown: false})
      }
    }
    return (
      <>
        <Tab.Navigator
          screenOptions={{
            headerShown: true,
            tabBarActiveTintColor: "hotpink",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: {
              backgroundColor: "white",
              borderTopWidth: 0,
              elevation: 0,
            },
          }}
          initalRouteName="Home"
          screenListeners={{
            state: (e) => {
              hiddenHeader(e.data.state.index);
            }
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeIndex}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="home" color={color} size={size} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Category"
          component={Category}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="list" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Favorite"
            component={Favorite}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="heart" color={color} size={size} />
              ),
              badgeStyle: { backgroundColor: "red" },
              // get value
              tabBarBadge: currentUser.favorite,
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="user" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </>
    );
  }
  
