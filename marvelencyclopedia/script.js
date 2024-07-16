const searchBar = document.getElementById('search-bar');
const suggestions = document.getElementById('suggestions');
const characterCards = document.getElementById('character-cards');

searchBar.addEventListener('input', () => {
  const query = searchBar.value.trim();
  if (query.length > 2) {
    fetch('https://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&apikey=pleaseenteryourapikeyhere')
      .then(response => response.json())
      .then(data => {
        showSuggestions(data.data.results);
      });
  } else {
    suggestions.innerHTML = '';
    suggestions.style.display = 'none';
  }
});

function showSuggestions(characters) {
  suggestions.innerHTML = '';
  characters.forEach(character => {
    const div = document.createElement('div');
    div.classList.add('suggestion-item');
    div.textContent = character.name;
    div.addEventListener('click', () => {
      searchBar.value = character.name;
      suggestions.innerHTML = '';
      suggestions.style.display = 'none';
      showCharacter(character);
    });
    suggestions.appendChild(div);
  });
  suggestions.style.display = 'block';
}

document.querySelector('.button2').addEventListener('click', () => {
  const query = searchBar.value.trim();
  if (query) {
    fetch('https://gateway.marvel.com/v1/public/characters?name=${query}&apikey=plsenteryourapikeyhere')
      .then(response => response.json())
      .then(data => {
        if (data.data.results.length > 0) {
          showCharacter(data.data.results[0]);
        } else {
          alert('Character not found!');
        }
      });
  }
});

function showCharacter(character) {
  characterCards.innerHTML = `
    <div class="card">
      <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
      <h2>${character.name}</h2>
      <p>${character.description || 'No description available'}</p>
    </div>
  `;
}
