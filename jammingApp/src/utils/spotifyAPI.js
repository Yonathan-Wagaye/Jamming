const CLIENT_ID= 'c736e9c5f3084e06a922d63810d5d28a';
const CLIENT_SECRET = 'a42dbace78e343d5b9969e9442bf2895';

export const getAccessToken = () => {
    const authParameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET, 
    };

    return fetch('https://accounts.spotify.com/api/token', authParameters)
        .then(result => result.json())
        .then(data => data.access_token);
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





