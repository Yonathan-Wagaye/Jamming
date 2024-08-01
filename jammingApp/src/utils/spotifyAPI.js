const CLIENT_ID= 'c736e9c5f3084e06a922d63810d5d28a';
const CLIENT_SECRET = 'a42dbace78e343d5b9969e9442bf2895';

const REDIRECT_URI = 'http://localhost:5173'; // Change this to your redirect URI
const SCOPES = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';

export const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${CLIENT_ID}&scope=${encodeURIComponent(SCOPES)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

export const getAccessTokenFromUrl = () => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return params.get('access_token');
};

export const fetchTracks = async (query, token) => {
  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data from Spotify');
  }

  const data = await response.json();
  return data.tracks.items;
};

export const savePlaylist = async (playlistName, tracks, token) => {
    const userProfileResponse = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
    if (!userProfileResponse.ok) {
      throw new Error('Failed to fetch user profile');
    }
  
    const userProfile = await userProfileResponse.json();
    const userId = userProfile.id;
  
    const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: playlistName,
        public: false
      })
    });
  
    if (!createPlaylistResponse.ok) {
      throw new Error('Failed to create playlist');
    }
  
    const createPlaylistData = await createPlaylistResponse.json();
    const playlistId = createPlaylistData.id;
  
    const trackUris = tracks.map(track => track.uri);
  
    const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uris: trackUris
      })
    });
  
    if (!addTracksResponse.ok) {
      throw new Error('Failed to add tracks to playlist');
    }
  };






