import {Text, View} from 'react-native'
import {styles} from './style.js'
import { useEffect } from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'

const TopTab = createMaterialTopTabNavigator()

export function Category (){
    return (
        <TopTab.Navigator>
            <TopTab.Screen name="Category1" component={Category1}/>
            <TopTab.Screen name="Category2" component={Category2}/>
            <TopTab.Screen name="Category3" component={Category3}/>
        </TopTab.Navigator>
    )
}

const Category1 = () =>{
    return(
        <View style={styles.container}>
            <Text>Category1</Text>
        </View>
    )
}

const Category2 = () =>{
    return(
        <View style={styles.container}>
            <Text>Category1</Text>
        </View>
    )
}

const Category3 = () =>{
    return(
        <View style={styles.container}>
            <Text>Category1</Text>
        </View>
    )
}