const apiKey = '9208cc2c7851fd830829cccc31b33504';
const apiUrl = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=';

document.getElementById('searchButton').addEventListener('click', () => {
    const artist = document.getElementById('artist').value;
    if (artist) {
        fetchRecommendations(artist);
    }
});

async function fetchRecommendations(artist) {
    const url = `${apiUrl}${artist}&api_key=${apiKey}&format=json`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayRecommendations(data.toptracks.track);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
    }
}

function displayRecommendations(tracks) {
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = '';
    tracks.forEach(track => {
        const trackDiv = document.createElement('div');
        trackDiv.classList.add('recommendation-item');
        trackDiv.innerHTML = `<h3>${track.name}</h3><p>${track.artist.name}</p>`;
        recommendationsDiv.appendChild(trackDiv);
    });
}
