import {View, Text, StyleSheet} from 'react-native';

export default function Navbar() {
    return (
        <View style={styles.navbar}>
        <Text style={styles.text}>Social Media Feed</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        height: 80,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
});