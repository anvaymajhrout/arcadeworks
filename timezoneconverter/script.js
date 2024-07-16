const timeZoneAPIKey = 'I will upload once I get.'; 

const cities = {
    "New York": "America/New_York",
    "Los Angeles": "America/Los_Angeles",
    "Chicago": "America/Chicago",
    "Houston": "America/Chicago",
    "Phoenix": "America/Phoenix",
    "Philadelphia": "America/New_York",
    "San Antonio": "America/Chicago",
    "San Diego": "America/Los_Angeles",
    "Dallas": "America/Chicago",
    "San Jose": "America/Los_Angeles",
    "Mumbai": "Asia/Kolkata",
    "Delhi": "Asia/Kolkata",
    "Bangalore": "Asia/Kolkata",
    "Hyderabad": "Asia/Kolkata",
    "Ahmedabad": "Asia/Kolkata"
};

document.addEventListener('DOMContentLoaded', () => {
    populateCitySelects();
});

function populateCitySelects() {
    const sourceSelect = document.getElementById('sourceCitySelect');
    const targetSelect = document.getElementById('targetCitySelect');
    
    Object.keys(cities).forEach(city => {
        const option = document.createElement('option');
        option.value = cities[city];
        option.textContent = city;
        sourceSelect.appendChild(option.cloneNode(true));
        targetSelect.appendChild(option.cloneNode(true));
    });
}

function convertTime() {
    const sourceCity = document.getElementById('sourceCitySelect').value;
    const targetCity = document.getElementById('targetCitySelect').value;
    const timeInput = document.getElementById('timeInput').value;

    if (!timeInput) {
        alert('Please enter a valid time.');
        return;
    }

    const [hours, minutes] = timeInput.split(':');
    const sourceDateTime = new Date();
    sourceDateTime.setHours(hours);
    sourceDateTime.setMinutes(minutes);

    const sourceTimeStamp = Math.floor(sourceDateTime.getTime() / 1000);

    const sourceZoneUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${timeZoneAPIKey}&format=json&by=zone&zone=${sourceCity}`;
    const targetZoneUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${timeZoneAPIKey}&format=json&by=zone&zone=${targetCity}`;

    Promise.all([fetch(sourceZoneUrl), fetch(targetZoneUrl)])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(([sourceData, targetData]) => {
            const sourceOffset = sourceData.gmtOffset;
            const targetOffset = targetData.gmtOffset;

            const targetTimeStamp = sourceTimeStamp + (targetOffset - sourceOffset);
            const targetDateTime = new Date(targetTimeStamp * 1000);

            const resultDiv = document.getElementById('result');
            resultDiv.textContent = `Time in ${targetCity.split('/')[1]}: ${targetDateTime.toTimeString().slice(0, 5)}`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


    const [hours, minutes] = timeInput.split(':');
    const sourceDateTime = new Date();
    sourceDateTime.setHours(hours);
    sourceDateTime.setMinutes(minutes);

    const sourceTimeStamp = Math.floor(sourceDateTime.getTime() / 1000);

    const sourceZoneUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${timeZoneAPIKey}&format=json&by=zone&zone=${sourceCountry}`;
    const targetZoneUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${timeZoneAPIKey}&format=json&by=zone&zone=${targetCountry}`;

    Promise.all([fetch(sourceZoneUrl), fetch(targetZoneUrl)])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(([sourceData, targetData]) => {
            const sourceOffset = sourceData.gmtOffset;
            const targetOffset = targetData.gmtOffset;

            const targetTimeStamp = sourceTimeStamp + (targetOffset - sourceOffset);
            const targetDateTime = new Date(targetTimeStamp * 1000);

            const resultDiv = document.getElementById('result');
            resultDiv.textContent = `Time in ${countries[targetCountry]}: ${targetDateTime.toTimeString().slice(0, 5)}`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
