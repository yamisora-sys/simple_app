import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome";
import { CurrentUserContext } from "../../context/userContext.js";
import { Help } from "./main/Help.js";
import { NotiIndex } from "./main/noti/index.js";
import { useContext, useEffect } from "react";
import { BottomNav } from "./BottomNav.js";

const Drawer = createDrawerNavigator();


export const MainScreen = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={BottomNav} options={{
        drawerIcon: ({focused, size}) => (
          <Icon name="home" size={size} color={focused ? 'hotpink' : '#ccc'} />
        )
      }}/>
      <Drawer.Screen name="Notification" component={NotiIndex} 
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon name="bell" size={size} color={focused ? 'hotpink' : '#ccc'} />
          )
        }}
      />
      <Drawer.Screen name="Help" component={Help} options={{
        drawerIcon: ({focused, size}) => (
          <Icon name="question-circle" size={size} color={focused ? 'hotpink' : '#ccc'} />
        )
      }}/>
    </Drawer.Navigator>
  );
};
