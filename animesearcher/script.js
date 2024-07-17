document.getElementById('anime-input').addEventListener('input', () => {
    const animeInput = document.getElementById('anime-input');
    const suggestionsContainer = document.getElementById('suggestions');
    const query = animeInput.value.trim();
    
    if (query.length < 3) {
      suggestionsContainer.innerHTML = '';
      suggestionsContainer.style.display = 'none';
      return;
    }
  
    fetch(`https://kitsu.io/api/edge/anime?filter[text]=${query}&page[limit]=5`)
      .then(response => response.json())
      .then(data => {
        suggestionsContainer.innerHTML = '';
        if (data.data.length > 0) {
          data.data.forEach(anime => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.textContent = anime.attributes.canonicalTitle;
            suggestionItem.addEventListener('click', () => {
              animeInput.value = anime.attributes.canonicalTitle;
              suggestionsContainer.innerHTML = '';
              suggestionsContainer.style.display = 'none';
            });
            suggestionsContainer.appendChild(suggestionItem);
          });
          suggestionsContainer.style.display = 'block';
        } else {
          suggestionsContainer.style.display = 'none';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        suggestionsContainer.style.display = 'none';
      });
  });
  
  document.getElementById('search-btn').addEventListener('click', () => {
    const animeInput = document.getElementById('anime-input');
    const resultContainer = document.getElementById('result-container');
    
    const query = animeInput.value.trim();
    
    if (!query) {
      alert('Please enter an anime title.');
      return;
    }
  
    fetch(`https://kitsu.io/api/edge/anime?filter[text]=${query}`)
      .then(response => response.json())
      .then(data => {
        resultContainer.innerHTML = '';
        if (data.data.length === 0) {
          resultContainer.textContent = 'No results found.';
          return;
        }
        data.data.forEach(anime => {
          const animeCard = document.createElement('div');
          animeCard.classList.add('anime-card');
          animeCard.innerHTML = `
            <img src="${anime.attributes.posterImage.small}" alt="${anime.attributes.canonicalTitle}">
            <h2>${anime.attributes.canonicalTitle}</h2>
            <p>${anime.attributes.synopsis}</p>
          `;
          resultContainer.appendChild(animeCard);
        });
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while fetching the anime information. Please try again.');
      });
  });
  