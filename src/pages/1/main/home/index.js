import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from './Home.js';
import {HomeDetail} from './Detail.js';
import {useContext} from 'react';
import {ScreenHeaderContext} from '../../../../context/userContext.js';
const Stack = createNativeStackNavigator();

export function HomeIndex ({navigation}) {
    const [screenHeader, setScreenHeader] = useContext(ScreenHeaderContext);
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true
            }}
            initalRouteName="Main"
            screenListeners={{
                state: (e) => {
                    console.log(e.data.state.index)
                    if(e.data.state.index === 0){
                        setScreenHeader(true)
                    }
                    else{
                        setScreenHeader(false)
                    }
                }
            }}
        >
            <Stack.Screen name="Main" component={Home} options={{
                headerShown: false
            }}/>
            <Stack.Screen name="HomeDetail" component={HomeDetail} />
        </Stack.Navigator>
    )

}