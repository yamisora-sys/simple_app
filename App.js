import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import PostList from "./src/pages/PostList.js";
import Healthy from "./src/pages/Healthy.js";

export default function App() {
  return (
    <View style={styles.container}>
      <PostList />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
});
