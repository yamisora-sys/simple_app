import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Switch,
  Pressable,
  Alert,
} from "react-native";

import { useState } from "react";
export default function FeedBack() {
  const [Darkmode, setDarkmode] = useState(false);
  const [noti, setNoti] = useState(false);
  const [FeedBack, setFeedBack] = useState("");
  const [ListFeedback, setListFeedback] = useState([]);
  const notification = () => {
    Alert.alert("Thank you for your feedback!", "", [
      {
        text: "ok",
        onPress: () => console.log("Cancel Pressed"),
      },
    ]);
  };
  const faq = () => {
    if (FeedBack != "") {
      setListFeedback([...ListFeedback, FeedBack]);
      if (noti) {
        notification();
      }
      setFeedBack("");
    }
  };

  return (
    <View style={[styles.container, Darkmode && styles.dark]}>
      <View style={styles.header}>
        <Image
          style={styles.headerimg}
          source={require("../../img/react-icon.png")}
        />
        <Text style={[styles.headertitle, Darkmode && styles.whiteTitle]}>
          React Native App
        </Text>
      </View>
      <View style={styles.body}>
        <View>
          <View style={styles.display}>
            <Text style={Darkmode && styles.whiteText}>Dark Mode</Text>
            <Switch value={Darkmode} onValueChange={setDarkmode} />
          </View>
          <View style={styles.display}>
            <Text style={Darkmode && styles.whiteText}>Notification</Text>
            <Switch value={noti} onValueChange={setNoti} />
          </View>
        </View>
        <View style={styles.container}>
          <Text style={Darkmode && styles.whiteText}>Feedback</Text>
          <TextInput
            multiline
            placeholder="Enter your feedback"
            placeholderTextColor="gray"
            style={styles.inputtext}
            value={FeedBack}
            onChangeText={setFeedBack}
          />
          <Pressable style={styles.btn} onPress={faq}>
            <Text>Send Feedback</Text>
          </Pressable>
        </View>
        <View>
          <Text style={[styles.headertitle, Darkmode && styles.whiteTitle]}>
            Frequently Asked Question
          </Text>
          {ListFeedback.map((item, index) => {
            return (
              <Text style={Darkmode && styles.whiteText} key={index}>
                Q: {item}
              </Text>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  dark: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0,
  },
  headerimg: {
    width: 100,
    height: 100,
  },
  headertitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  body: {
    padding: 20,
    width: "100%",
  },
  display: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputtext: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "pink",
    padding: 10,
    height: 100,
    marginTop: 10,
  },
  btn: {
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "aliceblue",
    borderColor: "aliceblue",
    color: "red",
  },
  whiteText: {
    color: "white",
  },
  whiteTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
