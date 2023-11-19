import { Pressable, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function PostButton({ icon, text, handleOnClick, color="#fffff" }) {
  return (
    <Pressable style={styles.action} onPress={handleOnClick}>
      <Icon name={icon} size={20} color={color} />
      <Text>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  action: {
    flexDirection: "row",
    alignItems: "center",
  },
});
