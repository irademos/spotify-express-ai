let authToken = null; // Placeholder for auth token
let userId = null;
let playlistName = '';
let searchResults = [];
let selectedPlaylists = [];
let frequency = 'daily';
let newPlaylistName = '';

document.addEventListener('DOMContentLoaded', function() {
    // Attach event listener once the DOM is fully loaded
    const loginButton = document.getElementById('loginButton');
    const searchInput = document.getElementById('playlistSearchInput');
    const searchResultsList = document.getElementById('searchResultsList');
    const selectedPlaylistsList = document.getElementById('selectedPlaylistsList');
    const selectedPlaylists = [];

    fetch('/api/config')
    .then(response => response.json())
    .then(config => {
        const loginButton = document.getElementById('loginButton');
        if (loginButton) {
            loginButton.addEventListener('click', () => {
                const CLIENT_ID = config.client_id;
                const REDIRECT_URI = config.redirect_uri;
                const SCOPES = 'user-library-read user-read-private playlist-read-private playlist-modify-private playlist-modify-public';

                const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;
                window.location.href = authUrl;
            });
        } else {
            console.error("Login button not found!");
        }
    })
    .catch(error => console.error('Error fetching config:', error));

    
    // if (loginButton) {
    //     loginButton.addEventListener('click', () => {
    //         // Construct Spotify authentication URL
    //         const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID; // Replace with your Spotify client ID
    //         const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI; // Replace with your redirect URI
    //         const SCOPES = 'user-library-read user-read-private playlist-read-private playlist-modify-private playlist-modify-public';
            
    //         const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;
    //         window.location.href = authUrl; // Redirect to Spotify login page
    //     });
    // } else {
    //     console.error("Login button not found!");
    // }

    // Function to fetch playlists from the Spotify API
    function searchPlaylists(query) {
        const accessToken = document.cookie.match(/spotifyAccessToken=([^;]+)/)?.[1];
        if (!accessToken || !query) return;

        fetch(`https://api.spotify.com/v1/search?q=${query}&type=playlist&limit=5`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
        })
        .then(response => response.json())
        .then(data => {
        // Clear previous results
        searchResultsList.innerHTML = '';

        // Display new search results
        const playlists = data.playlists.items;
        playlists.forEach(playlist => {
            const listItem = document.createElement('li');
            listItem.textContent = playlist.name;
            listItem.onclick = () => addToSelectedPlaylists(playlist);
            searchResultsList.appendChild(listItem);
        });
        })
        .catch(error => console.error('Error searching playlists:', error));
    }

    // Function to add a playlist to the selected playlists list
    function addToSelectedPlaylists(playlist) {
        if (!selectedPlaylists.some(p => p.id === playlist.id)) {
        selectedPlaylists.push(playlist);
        updateSelectedPlaylists();
        }
    }

    // Function to update the selected playlists UI
    function updateSelectedPlaylists() {
        selectedPlaylistsList.innerHTML = ''; // Clear the list

        selectedPlaylists.forEach(playlist => {
        const listItem = document.createElement('li');
        listItem.textContent = playlist.name;
        selectedPlaylistsList.appendChild(listItem);
        });
    }

    // Event listener for the search input
    searchInput.addEventListener('input', function (e) {
        const query = e.target.value;
        searchPlaylists(query); // Perform search as user types
    });


});

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.hash.substr(1)); // Get the hash params after '#'
    const accessToken = urlParams.get('access_token'); // Get access token from URL

    if (accessToken) {
        console.log('Spotify access token:', accessToken);
        // Store token in localStorage for later use
        localStorage.setItem('spotifyAccessToken', accessToken);
        document.getElementById('loginTemplate').style.display = 'none';
        document.getElementById('mainContentTemplate').style.display = 'block';
    }
};