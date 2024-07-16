document.addEventListener('DOMContentLoaded', () => {
    const countrySearchInput = document.getElementById('country-search');
    const fetchCountryDetailsButton = document.getElementById('fetch-country-details');
    const countryDetails = document.getElementById('country-details');
    const suggestionsContainer = document.getElementById('country-suggestions');

    let allCountries = [];

   
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            allCountries = data.map(country => country.name.common);
        });

    countrySearchInput.addEventListener('input', () => {
        const query = countrySearchInput.value.toLowerCase();
        const filteredCountries = allCountries.filter(country => country.toLowerCase().includes(query));
        suggestionsContainer.innerHTML = '';
        filteredCountries.forEach(country => {
            const suggestionDiv = document.createElement('div');
            suggestionDiv.classList.add('suggestion');
            suggestionDiv.textContent = country;
            suggestionDiv.addEventListener('click', () => {
                countrySearchInput.value = suggestionDiv.textContent;
                suggestionsContainer.style.display = 'none';
            });
            suggestionsContainer.appendChild(suggestionDiv);
        });
        suggestionsContainer.style.display = filteredCountries.length > 0 ? 'block' : 'none';
    });

    fetchCountryDetailsButton.addEventListener('click', () => {
        const selectedCountry = countrySearchInput.value;
        if (selectedCountry) {
            fetch(`https://restcountries.com/v3.1/name/${selectedCountry}`)
                .then(response => response.json())
                .then(data => {
                    displayCountryDetails(data[0]);
                });
        }
    });

    function displayCountryDetails(country) {
        countryDetails.innerHTML = `
            <h2>${country.name.common}</h2>
            <img src="${country.flags.png}" alt="${country.name.common} flag">
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Subregion:</strong> ${country.subregion}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
            <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
            <p><strong>Currencies:</strong> ${Object.values(country.currencies).map(currency => currency.name).join(', ')}</p>
        `;
        countryDetails.style.display = 'block';
    }
});
