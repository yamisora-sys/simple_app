import {View, Text, StyleSheet, Button} from 'react-native';

export default function CustomItem({item, func, isSelected}){

    let select = "Select";
    let unselect = "Unselect";
    return (
        <View style={styles.item}>
            <Text>{item}</Text>
            <Button title={
                isSelected ? unselect : select
            } onPress={func}/>
        </View>
    )
}

const styles = StyleSheet.create({
    item:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'pink',
        margin: 10,
        padding: 10,
        borderRadius: 20,
        opacity: 0.8,
    }
})