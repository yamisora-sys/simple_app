import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useRef } from "react";
import { Alert } from "react-native";
import LoadingOverlay from "./components/UI/LoadingOverlay";
import AppRoot from "./screens/AppRoot";
import { useStore } from "./store/store";
import { initialDatabase, deleteTable } from "./utils/database";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constantns from "expo-constants";

export default function App() {
  const [databaseLoading, setDatabaseLoading] = useState(true);
  const { loadPlacesAsync } = useStore().placeStore;
  const { loadMediaAsync } = useStore().mediaStore;

  // const [expoPushToken, setExpoPushToken] = useState("");
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();

  useEffect(() => {
    // if(true){
    //   deleteTable();
    // }
    (async () => {
      try {
        await initialDatabase();
        await loadPlacesAsync();
        await loadMediaAsync();
        setDatabaseLoading(false);
      } catch (error) {
        console.error(error);
        Alert.alert("Something went wrong with database...");
      }
    })();
    // registerForPushNotificationsAsync().then((token) =>
    //   setExpoPushToken(token)
    // );

    // notificationListener.current =
    //   Notifications.addNotificationReceivedListener((notification) => {
    //     setNotification(notification);
    //   });

    // responseListener.current =
    //   Notifications.addNotificationResponseReceivedListener((response) => {
    //     console.log(response);
    //   });

    // return () => {
    //   Notifications.removeNotificationSubscription(
    //     notificationListener.current
    //   );
    //   Notifications.removeNotificationSubscription(responseListener.current);
    // };
  }, []);

  if (databaseLoading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <StatusBar style="dark" />

      <AppRoot />
    </>
  );
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constantns.expoConfig.extra.eas.projectId,
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
