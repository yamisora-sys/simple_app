import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from './Home';
import {NewNote} from './NewNote';
import {EditNote} from './EditNote';
import {useEffect} from 'react';
const Stack = createNativeStackNavigator();

export function HomeIndex({navigation}) {

    return (
        <Stack.Navigator
        >
            <Stack.Screen name="Main" component={Home} 
            options={{
                headerShown: false
            }}
            />
            <Stack.Screen name="NewNote" component={NewNote} options={{
                headerShown: true
            }}/>
            <Stack.Screen name="EditNote" component={EditNote} options={{
                headerShown: true
            }}/>
        </Stack.Navigator>
    )
}