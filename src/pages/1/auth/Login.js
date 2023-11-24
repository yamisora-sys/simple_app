import { View, Text, StyleSheet, TextInput, Image, Button, Alert, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {useState, useContext} from 'react';
import { UserContext, getUser, CurrentUserContext } from "../../../context/userContext.js";
import { styles } from "./styles.js";

export function Login({navigation}) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [listUser, setUser] = useContext(UserContext);
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const auth = () =>{
      if(email != null || password != null){
        let userInfo = getUser(listUser, email);
        if (userInfo == null){
          Alert.alert("User not found")
        }
        else if(email == userInfo.email && password == userInfo.password){
            console.log("Login success");
            Alert.alert("Login success");
            // change context value
            setCurrentUser(userInfo);
            console.log(currentUser);
        }
        else{
            console.log("Login failed");
            Alert.alert("Email or Password is invalid");
        }
      }
      else {
        Alert.alert("Please enter email and password");
      }
    }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.headerimg}
          source={require("../../../img/react-icon.png")}
        />
        <Text style={[styles.headertitle]}>Welcome</Text>
      </View>
      <View style ={styles.body}>
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
        <Text style={styles.displayRight}>Forgot password?</Text>
        <Button style={styles.btnLogin} title="Login" color="orange" onPress={auth}/>
        <Text style={styles.headertitle}>Or Login With </Text>
        <View style={styles.option}>
            <Image style={styles.img} source={require("../../../img/facebook.png")} />
            <Image style={styles.img} source={require("../../../img/google.png")} />
        </View>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={styles.headertitle}>Don't have an account? 
          <Text style={styles.headertitle2}> Sign up here</Text>
          </Text>
          </Pressable>
      </View>
    </View>
  );
}
