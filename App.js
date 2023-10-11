import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import PostList from "./src/pages/PostList.js";
import Healthy from "./src/pages/Healthy.js";

export default function App() {
  return (
    <View>
      <PostList />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "aliceblue",
    alignItems: "center",
    width: "100%",
  },
});
