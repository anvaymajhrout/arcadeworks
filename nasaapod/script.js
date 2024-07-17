const apiKey = 'plsuseyourapi'; 

async function fetchAPOD() {
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
    const data = await response.json();

    document.getElementById('apod-image').src = data.url;
    document.getElementById('apod-title').textContent = data.title;
    document.getElementById('apod-description').textContent = data.explanation;
  } catch (error) {
    console.error('Error fetching APOD:', error);
  }
}

// Initial fetch
fetchAPOD();
