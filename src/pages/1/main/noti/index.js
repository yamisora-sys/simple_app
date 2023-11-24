import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Notification} from './Notification.js';
import {NotificationDetail} from './Detail.js';

const Stack = createNativeStackNavigator();

export function NotiIndex ({navigation}) {
    const headerHidden = (index) =>{
        if(index === 0){
            navigation.setOptions({
                headerShown: true
            })
        }
        else{
            navigation.setOptions({
                headerShown: false
            })
        }
    }
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
            }}
            screenListeners={{
                state: (e) => {
                    console.log(e.data.state.index)
                    headerHidden(e.data.state.index)
                }
            }}
        >
            <Stack.Screen name="Notification" component={Notification} options={{
                headerShown: false
            }}/>
            <Stack.Screen name="NotificationDetail" component={NotificationDetail} />
        </Stack.Navigator>
    );
}