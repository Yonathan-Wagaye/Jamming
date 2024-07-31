import { useEffect, useState, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import SearchResults from './components/SearchResults';
import { getAccessToken, fetchTracks } from './utils/spotifyAPI';
import './App.css';

function App() {
  const [accessToken, setAccessToken] = useState('');
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    async function fetchToken() {
      const token = await getAccessToken();
      setAccessToken(token);
    }
    fetchToken();
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

  return (
    <div>
      <NavBar />
      <SearchBar onSearch={handleSearch} />
      <SearchResults tracks={tracks} searched={searched} />
    </div>
  );
}

export default App;
