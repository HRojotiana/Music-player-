import * as MediaLibrary from 'expo-media-library';
import MusicInfo from 'expo-music-info-2';


export const fetchAudioFiles = async () => {
    const media = await MediaLibrary.getAssetsAsync({
      mediaType: MediaLibrary.MediaType.audio,
      first: 10,

      
    });

    return media.assets
  };


export const fetchAudioByAlbum = async (album: string) => {
    const media = await MediaLibrary.getAssetsAsync({
      mediaType: MediaLibrary.MediaType.audio,
      first: 10,
      sortBy: MediaLibrary.SortBy.default,
      album:album
    });
    const med=await MediaLibrary.getAlbumsAsync()

    return media.assets
  }






export const fetchMetadata = async (uri: string) => {
const metadata = await (MusicInfo as any).getMusicInfoAsync(uri, {
      title: true,
      artist: true,
      album: true,
      genre: true,
      picture: true
    });

    return metadata
    
};

