import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Pressable } from 'react-native';
import { PlayListCreateModal } from './PlayListModal';
import { PlayCircle, Music2, MoreVertical, Plus } from 'lucide-react-native';
import usePlaylistStore from '@/store/PlayListStore';
import { useRouter } from 'expo-router';

export const PlaylistScreen = () => {
  const {loadPlaylists,playlists}=usePlaylistStore();
  const router=useRouter() 

  useEffect(() => {
    loadPlaylists()
  }, []);


  const renderPlaylistItem = ({ item }: { item: Playlist }) => (
    <Pressable style={styles.playlistItem} 
     onPress={() =>
      router.push({
        pathname: `/playlist/track/[id]/list`,
        params: { 
          id:item.id,
          tracks: JSON.stringify(item.tracks)
        }, // Convertir en string
      })
    }
    >
      <View style={styles.playlistIconContainer}>
        <Music2 size={24} color="#6366f1" />
      </View>
      <View style={styles.playlistInfo}>
        <Text style={styles.playlistName}>{item.name}</Text>
        <Text style={styles.trackCount}>{item.tracks.length} tracks</Text>
      </View>
     
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Playlists</Text>
       
        <PlayListCreateModal />
      </View>
      
        
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={renderPlaylistItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
  },
  
  listContainer: {
    padding: 16,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  playlistIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#f1f5f9',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playlistInfo: {
    flex: 1,
    marginLeft: 16,
  },
  playlistName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  trackCount: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  playlistActions: {
    flexDirection: 'row',
    alignItems: 'center',
  }
}
)
  
