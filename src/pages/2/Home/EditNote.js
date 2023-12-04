import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {useState, useContext} from 'react';
import Icon from "react-native-vector-icons/FontAwesome";
import {updateData, getDBConection} from "../../../config/db";
import {useRoute} from "@react-navigation/native";
import {NoteContext, UPDATE} from "@context/noteContext";

export function EditNote({navigation}){
    const route = useRoute();
    const note = route.params;
    const [data, setData] = useContext(NoteContext);
    const [title, setTitle] = useState(note.title);
    const [description, setDescription] = useState(note.description);
    const saveNote = () => {
        if (title !== "" && description !== "") {
            setData({id: note.id, title: title, description: description}, UPDATE);
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
    },
})
