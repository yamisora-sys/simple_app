import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import Navbar from "../../components/1/navbar.js";
import { posts } from "../../data/post.js";
import Post from "../../components/1/post.js";

export default function PostList() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Navbar />
      <ScrollView>
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
  postlist: {
    width: "100%",
    alignItems: "center",
  },
  container:{
    backgroundColor: "aliceblue",
    alignItems: "center",
    width: "100%",
  }
});
