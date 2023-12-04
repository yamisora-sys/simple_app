import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {useState, useContext} from 'react';
import Icon from "react-native-vector-icons/FontAwesome";
import {insertData, getDBConection} from "../../../config/db";
import {NoteContext, ADD} from "@context/noteContext";
export function NewNote({navigation}){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [data, setData] = useContext(NoteContext);
    const saveNote = () => {
        if (title !== "" && description !== "") {
            setData({title: title, description: description}, ADD);
            navigation.navigate("Main");
        }
    }
    return (
        <View style={styles.container}>
            <View>
            <TextInput placeholder="Enter your Title" style={styles.titleInput} value={title} 
                onChangeText={setTitle}
            />
            <TextInput placeholder="Enter your note" style={styles.contentInput} value={description}
                onChangeText={setDescription}
            />
            </View>
            <View style={styles.btnDisplay}>
                <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                    <Icon name="times-circle" size={40} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{saveNote()}}>
                    <Icon name="check-circle-o" size={40} color="green" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    titleInput:{
        fontSize: 16,
        marginBottom: 20,
        color: "orange",
        borderWidth: 1,
        borderColor: "orange",
        borderRadius: 5,
        height: 40,
        padding: 10
    },
    contentInput:{
        fontSize: 16,
        marginBottom: 20,
        color: "orange",
        borderWidth: 1,
        borderColor: "orange",
        borderRadius: 5,
        height: 100,
        padding: 10
    },
    btnDisplay:{
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        margin: 40
    }
})
