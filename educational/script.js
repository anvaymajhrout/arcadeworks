document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = 'YOUR_YOUTUBE_API_KEY';
    const CHANNEL_ID = 'UC4a-Gbdw7vOaccHmFo40b9g';
    const SEARCH_QUERY = 'class 10 physics';
    const API_URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&type=video&q=${SEARCH_QUERY}&maxResults=12`;

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const videoList = document.getElementById('video-list');
            data.items.forEach(item => {
                const videoItem = document.createElement('div');
                videoItem.className = 'col-md-4 video-item';
                videoItem.innerHTML = `
                    <iframe src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <h5 class="p-2">${item.snippet.title}</h5>
                `;
                videoList.appendChild(videoItem);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
