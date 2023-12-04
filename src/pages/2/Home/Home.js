import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { getDBConection, deleteData } from "@config/db";
import { useCallback, useEffect, useState, useContext } from "react";
import { SettingContext } from "@context/settingContext";
import { NoteContext, DELETE } from "@context/noteContext";
import { useRoute } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import { darkmode } from "@style/darkmode";
const db = getDBConection();

export function Home({ navigation }) {
  const [data, setData] = useContext(NoteContext);
  const [setting, setSetting] = useContext(SettingContext);
  const [isDarkMode, setIsDarkMode] = useState({});
  const [fontSize, setFontSize] = useState({});
  useEffect(() => {
    setIsDarkMode(setting[0]);
    setFontSize(setting[1]);
  });
  return (
    isDarkMode && (
      <View style={[styles.container, isDarkMode.value && darkmode.container]}>
        <View>
          <Text style={[styles.headerTitle, isDarkMode.value && darkmode.title]}>Note App</Text>
        </View>
        <View style={styles.newNote}>
          <Text style={[isDarkMode.value && darkmode.text, {fontSize : fontSize.value}]}>All Notes</Text>
          <TouchableOpacity onPress={() => navigation.navigate("NewNote")}>
            <Icon name="plus-circle" size={30} color="orange" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {data &&
            data.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate("EditNote", {
                      id: item.id,
                      title: item.title,
                      description: item.description,
                    })
                  }
                  style={styles.divNote}
                >
                  <View style={styles.note}>
                    <Text style={[isDarkMode.value && darkmode.text,{ fontSize: fontSize.value }]}>{item.title}</Text>
                    <Text style={{fontSize: fontSize.value}}>{item.description}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setData(item, DELETE);
                    }}
                  >
                    <Icon name="trash" size={30} color="red" />
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "orange",
    textAlign: "center",
  },
  newNote: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
  },
  divNote: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "orange",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
