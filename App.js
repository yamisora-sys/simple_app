import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Index as Index1 } from "@pages/1/index.js";
import { Index as Index2 } from "@pages/2/index.js";
export default function App() {
  return (
      <Index1 />
      // <Index2 />
  );
}