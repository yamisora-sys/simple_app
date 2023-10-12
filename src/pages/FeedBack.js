import { View, Text, Image, TextInput, StyleSheet, Switch, Pressable } from "react-native";

import { useState } from "react";

export default function FeedBack() {
  const [Darkmode, setDarkmode] = useState(false);
  const [noti, setNoti] = useState(false);
  const [ListFeedback, setListFeedback] = useState([]);

  const notification = () =>{
    
  }
  const faq = (text) =>{
    setListFeedback([...ListFeedback, text]);
  }

  return (
    <View style={styles.container, Darkmode&&styles.dark}>
      <View style={styles.header}>
        <Image source={{ uri: "https://i.redd.it/5unn16axx1v81.jpg" }} />
        <Text>hikikomari</Text>
      </View>
      <View style={styles.setting}>
        <View style={styles.display}>
          <Text>Dark Mode</Text>
          <Switch value={Darkmode} onValueChange={setDarkmode} />
        </View>
        <View style={styles.display}>
          <Text>Notification</Text>
          <Switch value={noti} onValueChange={setNoti} />
        </View>
      </View>
      <View>
        <Text>Feedback</Text>
        <TextInput style={styles.inputtext}></TextInput>
        <Pressable style={styles.btn} onPress={faq}><Text>Send Feedback</Text></Pressable>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
container:{
},
dark:{
    backgroundColor: 'black',
},
  header: {
    
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderRadius: 50,
  },
  setting: {},
  display:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputtext:{
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'pink',
  },
  btn:{
    borderRadius: 10,
    borderWidth: 1,
    marginTop: "20px",
    alignItems: 'center',
    backgroundColor: 'aliceblue',
    borderColor: 'aliceblue',
    color: 'red'
  }
});