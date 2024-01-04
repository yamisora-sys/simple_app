// LibraryScreen.js

import React, { useEffect } from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import { useStore } from '../store/store';

const LibraryScreen = observer(() => {
  const { placeStore } = useStore();
  const navigation = useNavigation();

  useEffect(() => {
    // Load media data when the component mounts
    placeStore.loadMediaAsync();
  }, []);

  const renderItem = ({ item }) => {
    // Check if the item is an image or video and render accordingly
    if (item.imageUri) {
      return (
        <Image style={styles.mediaItem} source={{ uri: item.imageUri }} />
      );
    } else if (item.videoUri) {
      return (
        <TouchableOpacity onPress={() => handleVideoPress(item)}>
          <Text>Video Thumbnail (You can customize this)</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const handleVideoPress = (item) => {
    // Handle video press (e.g., navigate to a video player screen)
    console.log('Video Pressed:', item.videoUri);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={placeStore.media}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        numColumns={3} // Adjust the number of columns as needed
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  mediaItem: {
    flex: 1,
    aspectRatio: 1, // Maintain aspect ratio for images
    margin: 5,
  },
});

export default LibraryScreen;
