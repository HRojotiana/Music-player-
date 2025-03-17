import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import AudioPlayer from './AudioPlayer';
import { formatDuration } from '@/helpers/utils';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInRight } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

type AudioItemProps = {
  item: Track;
  index: number;
  isItInPlayList?: boolean;
  onDelete?: (id: string) => void;
};

const AudioItem = ({ item, index, isItInPlayList, onDelete }: AudioItemProps) => {
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

  const handleDelete = () => {
    Alert.alert(
      "Remove from Playlist",
      `Are you sure you want to remove "${item.filename}" from this playlist?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => onDelete?.(item.id)
        }
      ]
    );
  };

  return (
    <Animated.View
      entering={FadeInRight.delay(index * 100).springify()}
      style={styles.audioItem}
    >
      <TouchableOpacity onPress={handlePress} style={styles.touchable}>
        <LinearGradient
          colors={['rgba(17, 24, 39, 0.95)', 'rgba(17, 24, 39, 0.85)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}
        >
          <View style={styles.mainContent}>
            <View style={styles.iconContainer}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300&auto=format&fit=crop' }}
                style={styles.albumArt}
              />
              <LinearGradient
                colors={['rgba(139, 92, 246, 0.9)', 'rgba(139, 92, 246, 0.7)']}
                style={styles.playIconOverlay}
              >
                <Icon name="compact-disc" size={24} color="#FFFFFF" style={styles.spinningIcon} />
              </LinearGradient>
            </View>
            
            <View style={styles.audioInfo}>
              <Text style={styles.fileName} numberOfLines={1}>
                {item.filename}
              </Text>
            </View>
            
            <View style={styles.controlsContainer}>
              <AudioPlayer uri={item.uri} currentTitle={item.filename} />
              
              {isItInPlayList && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={handleDelete}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <LinearGradient
                    colors={['rgba(239, 68, 68, 0.2)', 'rgba(239, 68, 68, 0.1)']}
                    style={styles.deleteButtonGradient}
                  >
                    <Icon name="trash-can" size={16} color="#EF4444" />
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  audioItem: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    width: width - 32,
    alignSelf: 'center',
  },
  touchable: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  container: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    backgroundColor: 'rgba(17, 24, 39, 0.95)',
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  albumArt: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  playIconOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  spinningIcon: {
    transform: [{ rotate: '-30deg' }],
  },
  audioInfo: {
    flex: 1,
    gap: 8,
  },
  fileName: {
    fontSize: 16,
    color: '#F3F4F6',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  duration: {
    fontSize: 12,
    color: '#D1D5DB',
    marginLeft: 6,
    letterSpacing: 0.2,
  },
  divider: {
    width: 1,
    height: 12,
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
  },
  formatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  format: {
    fontSize: 12,
    color: '#D1D5DB',
    marginLeft: 6,
    letterSpacing: 0.2,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  deleteButton: {
    overflow: 'hidden',
    borderRadius: 12,
  },
  deleteButtonGradient: {
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
});

export default AudioItem;