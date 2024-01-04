import React from 'react';
import { View, Image, Video } from 'react-native';

const MediaItem = ({ media }) => {
  return (
    <View style={{ margin: 8 }}>
      {media.imageUri && <Image source={{ uri: media.imageUri }} style={{ width: 150, height: 150 }} />}
      {media.videoUri && (
        <Video
          source={{ uri: media.videoUri }}
          style={{ width: 150, height: 150 }}
          resizeMode="cover"
          shouldPlay={false}
          isLooping={false}
          useNativeControls={false}
        />
      )}
    </View>
  );
};

export default MediaItem;
