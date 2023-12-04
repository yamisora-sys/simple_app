import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createTable, insertData, getDBConection } from "@config/db";
import { TodoDB, TodoDBData } from "@migration/TodoDB";
import { HomeIndex } from "./Home/Index";
import { Setting } from "./Setting";
import { SettingProvider } from "@context/settingContext";
import { NoteProvider } from "@context/noteContext";
import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

export function Index() {
  const db = getDBConection();
  const init = useCallback(async () => {
    const firstTime = await AsyncStorage.getItem("firstTime");
    // AsyncStorage.setItem("firstTime", "true");
    if (firstTime === null || firstTime === "true") {
      TodoDB.map((item) => {
        createTable(db, item.tableName, item.fields);
      });
      TodoDBData.map((item) => {
        item.data.map((data) => {
          insertData(
            db,
            item.tableName,
            item.fields,
            `'${data.name}', ${data.value}`
          );
        });
      });
      AsyncStorage.setItem("firstTime", "false");
    }
  }, []);
  useEffect(() => {
    init();
    return () => {};
  }, []);
  return (
    <SettingProvider>
      <NoteProvider>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home"
      >
        <Tab.Screen
          name="Home"
          component={HomeIndex}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Icon name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={Setting}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Icon name="cog" size={size} color={color} />
            ),
            headerShown: true
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    </NoteProvider>
    </SettingProvider>
  );
}
