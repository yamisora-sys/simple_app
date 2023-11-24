import { View, Text, Button } from 'react-native';
import { styles } from "../style.js";

export function Notification ({navigation}){
    return(
        <View style={styles.container}>
            <Text>Notification</Text>
            <Button title="Go to Notification Detail" onPress={() => navigation.navigate('NotificationDetail')} />
        </View>
    )
}