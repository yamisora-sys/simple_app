import {Text, View, Button, Image, StyleSheet, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
export function ProductItem ({data}) {
    return (
    <View style={styles.container}>
        <Image source={{uri: data.image}} style={styles.productImg}/>
        <Text style={styles.productTitle}>{data.title}</Text>
        <View style={styles.productInfo}>
            <View>
            <Text style={styles.price}>${data.price}</Text>
            <Text>{data.rating.rate}<Icon name="star" size={20} color="#ffff34"/>({data.rating.count})</Text>
            </View>
            <TouchableOpacity>
                <Icon name="plus-circle" size={30} color="hotpink"/>
            </TouchableOpacity>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        borderRadius: 10,
        backgroundColor: 'aliceblue',
        padding: 10,
    },
    productImg:{
        height: '50%',
        width: '100%',
    },
    productInfo:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    price:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
    },
    productTitle:{
        fontSize: 16,
        fontWeight: 'bold',
    },
})