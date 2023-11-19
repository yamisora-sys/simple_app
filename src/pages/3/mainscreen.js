import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Home} from './main/Home.js';
import {Profile} from './main/Profile.js';
import {Favorite} from './main/Favorite.js';
import {Category} from './main/Category.js';
import { CurrentUserContext } from "../../context/userContext.js";
import {useContext} from 'react'
const Tab = createBottomTabNavigator();
export function MainScreen(){
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext)
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'hotpink',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: 'white',
                    borderTopWidth: 0,
                    elevation: 0
                }
            }}
        >
            <Tab.Screen name="Home" component={Home} 
                options= {{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="home" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen name="Category" component={Category} 
                options= {{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="list" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen name="Favorite" component={Favorite} 
                options= {{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="heart" color={color} size={size} />
                    ),
                    badgeStyle: {backgroundColor: 'red'},
                    // get value
                    tabBarBadge: currentUser.favorite, 
                }}
            />
            <Tab.Screen name="Profile" component={Profile} 
                options= {{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="user" color={color} size={size} />
                    )
                }}
            />
        </Tab.Navigator>
    )

}