document.addEventListener('DOMContentLoaded', () => {
    const originDropdown = document.getElementById('origin');
    const destinationDropdown = document.getElementById('destination');
    const searchButton = document.getElementById('search-button');
    const resultsContainer = document.getElementById('results-container');
    const API_KEY = 'I will upload once I get it.'; 

    async function fetchLocations() {
        const response = await fetch(`https://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/US/USD/en-US?query=New&apiKey=${API_KEY}`);
        const data = await response.json();
        const locations = data.Places;

        locations.forEach(location => {
            let option = document.createElement('option');
            option.value = location.PlaceId;
            option.text = location.PlaceName;
            originDropdown.appendChild(option.cloneNode(true));
            destinationDropdown.appendChild(option.cloneNode(true));
        });
    }

    async function fetchFlights(origin, destination, departureDate, returnDate) {
        const response = await fetch(`https://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/US/USD/en-US/${origin}/${destination}/${departureDate}/${returnDate}?apiKey=${API_KEY}`);
        const data = await response.json();
        return data.Quotes;
    }

    function displayResults(results) {
        resultsContainer.innerHTML = '';
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.classList.add('result');
            resultElement.innerHTML = `
                <p>Airline: ${result.CarrierIds}</p>
                <p>Price: $${result.MinPrice}</p>
                <p>Direct: ${result.Direct ? 'Yes' : 'No'}</p>
            `;
            resultsContainer.appendChild(resultElement);
        });
    }

    searchButton.addEventListener('click', async () => {
        const origin = originDropdown.value;
        const destination = destinationDropdown.value;
        const departureDate = document.getElementById('departure-date').value;
        const returnDate = document.getElementById('return-date').value;

        const flightResults = await fetchFlights(origin, destination, departureDate, returnDate);
        displayResults(flightResults);
    });

    fetchLocations();
});
