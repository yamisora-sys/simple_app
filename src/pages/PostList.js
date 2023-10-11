import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import Navbar from "../components/navbar.js";
import { posts } from "../data/post.js";
import Post from "../components/post.js";

export default function PostList() {
  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <Navbar />
      <ScrollView>
        <View style={styles.postlist}>
          {posts.map((post) => {
            return <Post {...post} key={post.id} />;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  postlist: {
    width: "100%",
    alignItems: "center",
  },
});
