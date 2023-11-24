import { View, Text, Button } from 'react-native'
import { styles } from '../style.js'

export function Home ({navigation}){
    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <Button title="Go to Home Detail" onPress={() => navigation.navigate('HomeDetail')}></Button>
        </View>
    )
}