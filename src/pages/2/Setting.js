import { View, Text, Button, Switch, StyleSheet } from 'react-native'
import { useState, useContext} from 'react'
import { getDBConection, DeleteDB, getData, updateData } from '@config/db'
import {SettingContext} from '@context/settingContext'
import Slider from '@react-native-community/slider'
export function Setting () {
    const [setting, setSetting] = useContext(SettingContext)
    const db = getDBConection()
    const [isDarkMode, setIsDarkMode] = useState(setting[0])
    const [fontSize, setFontSize] = useState(setting[1])
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    return (
        setting && (<View style={[styles.container, isDarkMode.value&&styles.darkmode]}>
            <View style={styles.settingItem}>
                <Text style={[styles.settingTitle, isDarkMode.value&&styles.darkText]}>Dark Mode</Text>
                <Switch value={
                    isDarkMode.value == 1 ? true : false
                } 
                    onValueChange={(value) => {
                        setSetting(isDarkMode.id, value == true ? 1 : 0)
                        setIsDarkMode({
                            id: isDarkMode.id,
                            value: value == true ? 1 : 0
                        })
                    }}
                />
                </View>
            <View style={styles.settingItem}>
                <Text style={[styles.settingTitle, isDarkMode.value&&styles.darkText]}>Font Size</Text>
                <Text style={[styles.settingTitle, isDarkMode.value&&styles.darkText]}>{fontSize.value}</Text>
            </View>
            <Slider
                    style={{width: "100%", height: 40}}
                    minimumValue={1}
                    maximumValue={100}
                    step = {1}
                    minimumTrackTintColor="#f61010"
                    maximumTrackTintColor="#c25d5d"
                    value={fontSize.value}
                    onValueChange={(value) => {
                        setFontSize({
                            id: fontSize.id,
                            value: value
                        })
                    }}
                    onSlidingComplete={(value) => {
                        setSetting(fontSize.id, value)
                    }}
                />
        </View>
        )
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        color: "#ff0000",
    },
    settingItem:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        margin: 20,
        borderBottomColor: "#ccc",
    },
    darkmode:{
        flex: 1,
        backgroundColor: "#000",
    },
    darkText:{
        color: "#fff"
    }
})