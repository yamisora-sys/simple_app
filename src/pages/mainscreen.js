import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Home} from './main/Home.js';
import Profile from './main/profile/index.js';
import {Cart} from './main/Cart.js';
import {Category} from './main/Category.js';
import { CurrentUserContext } from "@context/userContext.js";
import {useContext} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductDetail } from './product/ProductDetail.js';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export function MainScreen(){
    return (
        <Stack.Navigator>
            <Stack.Screen name="BottomTab" component={BottomTab} options={{headerShown: false}}/>
            <Stack.Screen name="ProductDetail" component={ProductDetail} options={{headerShown: true}}/>
        </Stack.Navigator>
    )
}

const BottomTab = () => {
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext)
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: true,
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
            <Tab.Screen name="Cart" component={Cart} 
                options= {{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="heart" color={color} size={size} />
                    ),
                    badgeStyle: {backgroundColor: 'red'},
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