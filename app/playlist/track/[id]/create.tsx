import { fetchAudioFiles } from "@/helpers/fetch";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { router, useLocalSearchParams } from "expo-router";
import usePlaylistStore from "@/store/PlayListStore";
import Icon from "react-native-vector-icons/FontAwesome6";
import { THEME_COLOR, THEME_COLOR_LIGHT } from "@/helpers/BaseColor";


export default function MusicList() {
  const [audioFiles, setAudioFiles] = useState<MediaLibrary.Asset[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<Set<string>>(new Set());
  const {id}=useLocalSearchParams()
  const {addTracksToPlaylist,playlists}=usePlaylistStore()
  const playlistId = Array.isArray(id) ? id[0] : id;
  useEffect(() => {
    fetchAudioFiles().then(setAudioFiles);
  }, []);
  const playList=playlists.find((playlist)=>playlist.id===id)

    const availableTracks = audioFiles.filter(file => {
    return !playList?.tracks.some(playListTrack => playListTrack.uri === file.uri);
  });

  const toggleTrackSelection = (uri: string) => {
    setSelectedTracks(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(uri)) {
        newSelection.delete(uri);
      } else {
        newSelection.add(uri);
      }
      return newSelection;
    });
  };

  const addToPlaylist = () => {
    const selectedAudioFiles = audioFiles.filter(file => 
      selectedTracks.has(file.uri)
    );
    
    const tracks: Track[] = selectedAudioFiles.map(file => ({
      id:file.id,
      filename: file.filename,
      uri: file.uri,
      duration:file.duration
    }));
    addTracksToPlaylist(playlistId,tracks)

    router.replace(`/playlist/track/${playlistId}/list`);
    router.back();
   
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Musics</Text>
        {selectedTracks.size > 0 && (
          <Pressable style={styles.addButton} onPress={addToPlaylist}>
            <Icon name="plus" color="#fff" size={24} />
            <Text style={styles.addButtonText}>
              Add to Playlist ({selectedTracks.size})
            </Text>
          </Pressable>
        )}
      </View>

      <ScrollView style={styles.list}>
        {availableTracks.map((file) => (
          <Pressable
            key={file.uri}
            style={styles.trackItem}
            onPress={() => toggleTrackSelection(file.uri)}
          >
            <View style={styles.trackInfo}>
              <View style={styles.iconContainer}>
                <Icon name="music" size={24} color="#ffffff" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.trackName} numberOfLines={1}>
                  {file.filename}
                </Text>
                <Text style={styles.duration}>
                  {Math.round(file.duration)} seconds
                </Text>
              </View>
            </View>
            <View style={[
              styles.checkbox,
              selectedTracks.has(file.uri) && styles.checkboxSelected
            ]}>
              {selectedTracks.has(file.uri) && (
                <Icon name="checkcircle" size={24} color="#8B1A05" />
              )}
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: 'rgba(17, 24, 39, 0.7)',
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: '#F9FAFB',
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8B1A05",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  list: {
    flex: 1,
  },
  trackItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#111827",
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    shadowColor: THEME_COLOR,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: THEME_COLOR_LIGHT,
  },
  trackInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: "#8B1A05",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
  },
  trackName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  duration: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#cbd5e1",
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    borderColor: "#8B1A05",
  },
});