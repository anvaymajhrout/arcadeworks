document.addEventListener('DOMContentLoaded', () => {
    const pokemonSearchInput = document.getElementById('pokemon-search');
    const fetchDetailsButton = document.getElementById('fetch-details');
    const pokemonDetails = document.getElementById('pokemon-details');
    const suggestionsContainer = document.getElementById('pokemon-suggestions');

    let allPokemon = [];

    
    fetch('https://pokeapi.co/api/v2/pokemon?limit=200') 
        .then(response => response.json())
        .then(data => {
            allPokemon = data.results.map(pokemon => pokemon.name);
        });

    pokemonSearchInput.addEventListener('input', () => {
        const query = pokemonSearchInput.value.toLowerCase();
        const filteredPokemon = allPokemon.filter(pokemon => pokemon.includes(query));
        suggestionsContainer.innerHTML = '';
        filteredPokemon.forEach(pokemon => {
            const suggestionDiv = document.createElement('div');
            suggestionDiv.classList.add('suggestion');
            suggestionDiv.textContent = pokemon.charAt(0).toUpperCase() + pokemon.slice(1);
            suggestionDiv.addEventListener('click', () => {
                pokemonSearchInput.value = suggestionDiv.textContent;
                suggestionsContainer.style.display = 'none';
            });
            suggestionsContainer.appendChild(suggestionDiv);
        });
        suggestionsContainer.style.display = filteredPokemon.length > 0 ? 'block' : 'none';
    });

    fetchDetailsButton.addEventListener('click', () => {
        const selectedPokemon = pokemonSearchInput.value.toLowerCase();
        if (selectedPokemon) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
                .then(response => response.json())
                .then(data => {
                    displayPokemonDetails(data);
                });
        }
    });

    function displayPokemonDetails(pokemon) {
        pokemonDetails.innerHTML = `
            <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p><strong>ID:</strong> ${pokemon.id}</p>
            <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
            <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
            <p><strong>Type:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
            <p><strong>Base Experience:</strong> ${pokemon.base_experience}</p>
            <p><strong>Abilities:</strong> ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
            <p><strong>Stats:</strong> ${pokemon.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ')}</p>
        `;
        pokemonDetails.style.display = 'block';
    }
});
