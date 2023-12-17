import { View, Text, StyleSheet, TextInput, Image, Button, Alert, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {useState, useContext} from 'react';
import { UserContext, getUser, CurrentUserContext } from "@context/userContext.js";
import { styles } from "./styles.js";

export function Register({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [comfirmPassword, setComfirmPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [user, setUser] = useContext(UserContext);
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const register = () => {
      let userInfo = getUser(user, email);
      if(email != "" || password != "" || comfirmPassword != "" || userName != ""){
        if(userInfo != null){
          Alert.alert("Email is already exist");
        }
        else if(password == comfirmPassword){
          let userInfo = {
            email: email,
            password: password,
            username: userName,
            favorite: Math.floor(Math.random() * 100) + 1,
          }
          setUser([...user, userInfo]);
          Alert.alert("Register success");
          navigation.navigate('Login');
        }
        else{
          Alert.alert("Comfirm password is invalid");
        }
      }
      else{
        Alert.alert("Please enter all information");
      }
    }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.headerimg}
          source={require("@img/react-icon.png")}
        />
        <Text style={[styles.headertitle]}>Create New Account</Text>
      </View>
      <View style ={styles.body}>
      <View style={styles.display}>
          <Icon style={styles.icon} name="user" size={20} color="black" />
          <TextInput
            style={styles.input}
            placeholder="User Name"
            placeholderTextColor="black"
            onChangeText={setUserName}
          />
        </View>
        <View style={styles.display}>
          <Icon style={styles.icon} name="envelope-square" size={20} color="black" />
          <TextInput
            style={styles.input}
            placeholder="email"
            placeholderTextColor="black"
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.display}>
          <Icon style={styles.icon} name="unlock-alt" size={25} color="black" />
          <TextInput
            style={styles.input}
            placeholder="password"
            placeholderTextColor="black"
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.display}>
          <Icon style={styles.icon} name="unlock-alt" size={25} color="black" />
          <TextInput
            style={styles.input}
            placeholder="comfirm password"
            placeholderTextColor="black"
            onChangeText={setComfirmPassword}
            secureTextEntry={true}
          />
        </View>
        <Button style={styles.btnLogin} title="Create" color="orange" onPress={register}/>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.headertitle}>Already have an account?
          <Text style={styles.headertitle2}> Login now!</Text></Text>
          </Pressable>
      </View>
    </View>
  );
}
