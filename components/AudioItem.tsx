// AudioItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Music2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AudioPlayer from './AudioPlayer';
import { formatDuration } from '@/helpers/utils';
import * as MediaLibrary  from 'expo-media-library';

type AudioItemProps = {
  item: Track;
  index: number;
};

const AudioItem = ({ item, index }: AudioItemProps) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/(details)/[slug]",
      params: {
        slug: item.id,
        details: JSON.stringify({
          filename: item.filename,
          duration: item.duration,
          uri: item.uri,
        }),
      },
    });
  };

  return (
    <TouchableOpacity style={styles.audioItem} onPress={handlePress}>
      <View style={styles.iconContainer}>
        <Music2 size={24} color="#6366f1" />
      </View>
      <View style={styles.audioInfo}>
        <Text style={styles.fileName} numberOfLines={1}>
          {item.filename}
        </Text>
        <Text style={styles.duration}>{formatDuration(item.duration)}</Text>
      </View>
      <AudioPlayer uri={item.uri} currentTitle={item.filename} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  audioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioInfo: {
    flex: 1,
    marginLeft: 12,
  },
  fileName: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  duration: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
});

export default AudioItem;
