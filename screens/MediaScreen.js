// LibraryScreen.js

import React, { useCallback, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { observer } from 'mobx-react';
import { useStore } from '../store/store';
import { Video } from 'expo-av';
import { usePermissions} from 'expo-media-library'
const LibraryScreen = observer(() => {
  const { media, loadMediaAsync } = useStore().mediaStore;
  const navigation = useNavigation();
  const [permission, askForPermission] = usePermissions();
  useFocusEffect(
    useCallback(() => {
      (async () => {
        await loadMediaAsync();
      })();
    }, [])
  );
  useEffect(() => {
    if(!permission || permission.status !== "granted") {
      Alert.alert("Permission Needed", "This app need permisson to access library", [
        {
          text: "Allow",
          onPress: () => askForPermission(),
        },
        {
          text: "Cancel",
          onPress: () => askForPermission(false),
        }
      ]);
    }
  }, []);
  return (
    <View style={styles.container}>
      {
        media.length > 0 &&(
          <FlatList
            data={media}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              item.mediaType === 'video' ? (
                <Video
                  source={{ uri: item.uri }}
                  style={styles.mediaItem}
                  useNativeControls
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={{ uri: item.uri }}
                  style={styles.mediaItem}
                />
              )
            )}
            numColumns={3}
          />
        )
      }
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mediaItem: {
    flex: 1,
    aspectRatio: 1, // Maintain aspect ratio for images
    margin: 5,
  },
});

export default LibraryScreen;
