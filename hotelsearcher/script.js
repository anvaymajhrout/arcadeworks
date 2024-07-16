document.addEventListener('DOMContentLoaded', () => {
    const cityDropdown = document.getElementById('city');
    const searchButton = document.getElementById('search-button');
    const resultsContainer = document.getElementById('results-container');
    const API_KEY = 'Iwilluploaonceiget'; 

    async function fetchCities() {
        const response = await fetch(`https://api.hotels.com/v1/cities?apikey=${API_KEY}`);
        const data = await response.json();
        const cities = data.cities;

        cities.forEach(city => {
            let option = document.createElement('option');
            option.value = city.id;
            option.text = city.name;
            cityDropdown.appendChild(option);
        });
    }

    async function fetchHotels(city, checkinDate, checkoutDate, guests) {
        const response = await fetch(`https://api.hotels.com/v1/hotels/search?cityId=${city}&checkin=${checkinDate}&checkout=${checkoutDate}&guests=${guests}&apikey=${API_KEY}`);
        const data = await response.json();
        return data.hotels;
    }

    function displayResults(results) {
        resultsContainer.innerHTML = '';
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.classList.add('result');
            resultElement.innerHTML = `
                <p>Hotel: ${result.name}</p>
                <p>Price: $${result.price}</p>
                <p>Rating: ${result.rating}</p>
                <p><a href="${result.url}" target="_blank">Book Now</a></p>
            `;
            resultsContainer.appendChild(resultElement);
        });
    }

    searchButton.addEventListener('click', async () => {
        const city = cityDropdown.value;
        const checkinDate = document.getElementById('checkin-date').value;
        const checkoutDate = document.getElementById('checkout-date').value;
        const guests = document.getElementById('guests').value;

        const hotelResults = await fetchHotels(city, checkinDate, checkoutDate, guests);
        displayResults(hotelResults);
    });

    fetchCities();
});
