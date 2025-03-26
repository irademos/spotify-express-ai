let authToken = null; // Placeholder for auth token
let userId = null;
let playlistName = '';
let searchResults = [];
let selectedPlaylists = [];
let frequency = 'daily';
let newPlaylistName = '';

document.addEventListener("DOMContentLoaded", function() {
  const loginButton = document.getElementById('loginButton');
  const playlistSearchInput = document.getElementById('playlistSearchInput');
  const searchResultsList = document.getElementById('searchResultsList');
  const selectedPlaylistsList = document.getElementById('selectedPlaylistsList');
  const createPlaylistButton = document.getElementById('createPlaylistButton');
  const newPlaylistNameInput = document.getElementById('newPlaylistNameInput');

  loginButton.addEventListener('click', login);
  playlistSearchInput.addEventListener('input', (e) => searchPlaylists(e.target.value));
  createPlaylistButton.addEventListener('click', createPlaylist);

  function login() {
    // Example login function to set authToken and userId
    authToken = 'exampleAuthToken';
    userId = 'exampleUserId';
    updatePage();
  }

  function searchPlaylists(query) {
    // Simulate searching playlists (use Spotify API in a real app)
    searchResults = [
      { id: '1', name: 'Playlist 1' },
      { id: '2', name: 'Playlist 2' },
    ];

    updateSearchResults();
  }

  function updateSearchResults() {
    searchResultsList.innerHTML = '';
    searchResults.forEach(playlist => {
      const listItem = document.createElement('li');
      listItem.textContent = playlist.name;
      listItem.style.cursor = 'pointer';
      listItem.addEventListener('click', () => addPlaylist(playlist));
      searchResultsList.appendChild(listItem);
    });
  }

  function addPlaylist(playlist) {
    if (!selectedPlaylists.find(p => p.id === playlist.id)) {
      selectedPlaylists.push(playlist);
      updateSelectedPlaylists();
    }
  }

  function updateSelectedPlaylists() {
    selectedPlaylistsList.innerHTML = '';
    selectedPlaylists.forEach(playlist => {
      const listItem = document.createElement('li');
      listItem.textContent = playlist.name;
      selectedPlaylistsList.appendChild(listItem);
    });
  }

  function createPlaylist() {
    // Create new playlist logic here (e.g., call Spotify API)
    console.log('Creating playlist with name:', newPlaylistName);
  }

  function updatePage() {
    if (!authToken) {
      document.getElementById('content').innerHTML = document.getElementById('loginTemplate').innerHTML;
    } else {
      document.getElementById('content').innerHTML = document.getElementById('mainContentTemplate').innerHTML;
      updateSelectedPlaylists();
    }
  }

  updatePage(); // Initial page load
});
