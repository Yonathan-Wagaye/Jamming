import { useEffect, useState, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import SearchResults from './components/SearchResults';
import Playlist from  './components/Playlist';
import { getAccessTokenFromUrl, fetchTracks, authUrl, savePlaylist } from './utils/spotifyAPI';
import './App.css';

function App() {
  const [accessToken, setAccessToken] = useState('');
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [searched, setSearched] = useState(false);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const token = getAccessTokenFromUrl();
    if (token) {
      setAccessToken(token);
      localStorage.setItem('spotify_access_token', token);
      window.history.pushState({}, null, '/'); 
    } else {
      const storedToken = localStorage.getItem('spotify_access_token');
      if (storedToken) {
        setAccessToken(storedToken);
      } else {
        window.location = authUrl;
      }
    }
  }, []);

  const handleSearch = useCallback(async (userInput) => {
    if (accessToken) {
      setQuery(userInput);
      const tracksResult = await fetchTracks(userInput, accessToken);
      setTracks(tracksResult);
      setSearched(true);
      console.log(tracksResult);
    }
  }, [accessToken]);

  const handleAddTrack = (track) => {
    if(!playlist.find(savedTrack => savedTrack.id === track.id)) {
      setPlaylist(prevList => [...prevList, track]);
    }
  };

  const handleRemoveTrack = (track) => {
    setPlaylist(prevPlaylist => prevPlaylist.filter(savedTrack => savedTrack.id !== track.id));
  };

  const handleSubmit = async (playlistName) => {
    if (accessToken && playlist.length > 0 && playlistName.length > 0) {
      await savePlaylist(playlistName, playlist, accessToken);
      setPlaylist([]);
    }
  } 
  return (
    <div>
      <NavBar />
      <SearchBar onSearch={handleSearch} />
      <div className='main-container'>
        <SearchResults tracks={tracks} searched={searched} addTrack={handleAddTrack}/>
        <Playlist playlist={playlist} removeTrack={handleRemoveTrack} onSubmit={handleSubmit}/>
      </div>
      
    </div>
  );
}

export default App;
