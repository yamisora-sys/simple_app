// LibraryScreen.js

import React, { useCallback } from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { observer } from 'mobx-react';
import { useStore } from '../store/store';
import { Video } from 'expo-av';

const LibraryScreen = observer(() => {
  const { media, loadMediaAsync } = useStore().mediaStore;
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await loadMediaAsync();
      })();
    }, [])
  );

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
