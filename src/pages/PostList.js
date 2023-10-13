import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { posts } from "../data/post.js";
import Post from "../components/post.js";

export default function PostList() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView>
        <View style={styles.navbar}>
          <Text style={styles.text}>Social Media Feed</Text>
        </View>
        <View style={styles.postlist}>
          {posts.map((post) => {
            return <Post {...post} key={post.id} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 80,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  postlist: {
    alignItems: "center",
    width: "85%",
    alignSelf: "center",
  },
  container: {
    backgroundColor: "aliceblue",
    alignItems: "center",
    width: "100%",
  },
});
