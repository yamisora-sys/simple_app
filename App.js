import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import PostList from "./src/pages/1/PostList.js";
import FeedBack from "./src/pages/2/FeedBack.js";
import { Index } from "./src/pages/3/index.js";

export default function App() {
  return (
      <PostList />
  );
}