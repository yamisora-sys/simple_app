import {Text, View, Button} from 'react-native'
import {styles} from './style.js'
import {useContext} from 'react'
import {CurrentUserContext} from '../../../context/userContext.js'

export function Profile() {
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext)
    return (
    <View style={styles.container}>
        <Text>Profile Screen</Text>
        <Text>{currentUser.email}</Text>
        <Button title="Logout" onPress={() => setCurrentUser(null)}></Button>
    </View>
    )
}